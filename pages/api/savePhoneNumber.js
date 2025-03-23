import { adminDb } from '../../lib/firebase-admin';

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { phone } = req.body;
    
    // Validate input
    if (!phone || typeof phone !== 'string') {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return res.status(400).json({ 
        error: 'Invalid phone number length (10-15 digits required)' 
      });
    }

    // Save to Firestore
    const docRef = await adminDb.collection('phoneNumbers').add({
      number: cleanPhone,
      timestamp: new Date().toISOString(),
      status: 'pending'
    });

    return res.status(200).json({
      success: true,
      id: docRef.id,
      number: cleanPhone
    });

  } catch (error) {
    console.error('💥 API Error:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      input: req.body
    });
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Please try again later'
    });
  }
}