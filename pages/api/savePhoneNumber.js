import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { phone } = req.body;
    if (!phone || !/^\d{10,15}$/.test(phone)) {
      return res.status(400).json({ error: "Valid phone number required (10-15 digits)" });
    }

    // Validate environment variables
    const requiredEnvVars = [
      'GOOGLE_SERVICE_ACCOUNT',
      'GOOGLE_SHEET_ID'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing ${envVar} in environment`);
      }
    }

    // Parse service account credentials
    let serviceAccount;
    try {
      serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    } catch (parseError) {
      throw new Error("Failed to parse service account JSON: " + parseError.message);
    }

    // Configure authentication
    const auth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key
        .replace(/\\n/g, '\n')  // Handle environment variable escaping
        .replace(/\\\\/g, '\\'), // Fix double escapes
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    // Connect to Google Sheet
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
    
    try {
      await doc.loadInfo();
      console.log(`Connected to sheet: ${doc.title}`);
    } catch (loadError) {
      throw new Error(`Failed to load sheet: ${loadError.message}`);
    }

    const sheet = doc.sheetsByIndex[0];
    console.log(`Using sheet: ${sheet.title}`);

    // Verify headers
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues.map(h => h.toLowerCase());
    if (!headers.includes('phone') || !headers.includes('timestamp')) {
      throw new Error('Sheet is missing required headers (Phone and Timestamp)');
    }

    // Add new row
    const timestamp = new Date().toISOString();
    await sheet.addRow({
      Phone: phone,
      Timestamp: timestamp
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Error Details:", {
      errorMessage: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    return res.status(500).json({ 
      error: "Internal Server Error",
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}