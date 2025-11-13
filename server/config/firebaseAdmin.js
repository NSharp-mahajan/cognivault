import { initializeApp, cert, applicationDefault, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function buildCredentialFromEnv() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString("utf8");
      return cert(JSON.parse(decoded));
    } catch (error) {
      console.warn("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", error.message);
    }
  }

  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    return cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    return applicationDefault();
  }

  return null; // Return null instead of throwing error
}

let firebaseAuth = null;

// Initialize Firebase Admin if credentials are available
if (!getApps().length) {
  const credential = buildCredentialFromEnv();
  if (credential) {
    initializeApp({
      credential,
    });
    firebaseAuth = getAuth();
    console.log('✅ Firebase Admin initialized');
  } else {
    console.warn('⚠️  Firebase Admin not configured - using mock auth mode');
  }
}

export async function verifyFirebaseToken(idToken) {
  // If Firebase Admin is not configured, use mock mode
  if (!firebaseAuth) {
    console.warn('⚠️  Firebase Admin not configured - accepting token without verification (mock mode)');
    return {
      uid: 'demo_user',
      email: 'demo@example.com',
      mock: true
    };
  }

  if (!idToken) {
    const authError = new Error("Authorization token missing.");
    authError.code = "auth/missing-token";
    throw authError;
  }

  try {
    return await firebaseAuth.verifyIdToken(idToken);
  } catch (error) {
    const authError = new Error("Invalid or expired authorization token.");
    authError.code = "auth/invalid-token";
    authError.original = error;
    throw authError;
  }
}

