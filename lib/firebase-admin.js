const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Validate environment variables before initialization
const validateFirebaseConfig = () => {
  const requiredEnvVars = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
  ];

  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`Missing ${envVar} in environment variables`);
    }
  });

  if (!process.env.FIREBASE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY')) {
    throw new Error('Invalid private key format');
  }
};

try {
  validateFirebaseConfig();
  
  const adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });

  const adminDb = getFirestore(adminApp);
  console.log('✅ Firebase Admin initialized successfully');

  // Test connection immediately
  adminDb.collection('connection_test').doc('test').set({ test: new Date() })
    .then(() => console.log('🔥 Firestore connection verified'))
    .catch(err => console.error('💥 Firestore connection failed:', err));

  module.exports = { adminDb };

} catch (error) {
  console.error('🔥 Critical Firebase initialization error:');
  console.error(error.message);
  process.exit(1);
}