# Firebase Authentication Setup Guide

This guide will help you configure Firebase Authentication for CogniVault.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project
3. Follow the setup wizard:
   - Enter project name: `cognivault` (or your preferred name)
   - Enable/disable Google Analytics (optional)
   - Click **"Create project"**

## Step 2: Enable Email/Password Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click **"Get started"** if you haven't enabled it yet
3. Click on the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** and click **"Save"**

## Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. If you don't have a web app, click **"</>"** (Web icon) to add one
5. Register your app with a nickname (e.g., "CogniVault Web")
6. Copy the **Firebase SDK configuration** object

## Step 4: Create Environment Variables

1. In the `client/` directory, create a file named `.env` (if it doesn't exist)
2. Add the following variables with your Firebase config values:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Example `.env` file:

```env
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuv
VITE_FIREBASE_AUTH_DOMAIN=cognivault-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=cognivault-12345
VITE_FIREBASE_STORAGE_BUCKET=cognivault-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

## Step 5: How the Configuration is Used

The Firebase configuration is loaded in `client/src/firebase/firebaseConfig.js`:

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

**Important Notes:**
- All environment variables must start with `VITE_` to be accessible in Vite
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Restart your dev server after adding/changing `.env` variables

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/signup` and create a test account
3. Check Firebase Console → Authentication → Users to see your new user
4. Try logging in at `/login`
5. Access the protected `/dashboard` route

## Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Double-check your `VITE_FIREBASE_API_KEY` in `.env`
- Make sure there are no extra spaces or quotes
- Restart your dev server

### "Firebase: Error (auth/operation-not-allowed)"
- Go to Firebase Console → Authentication → Sign-in method
- Ensure "Email/Password" is enabled

### Environment variables not loading
- Ensure variables start with `VITE_`
- Restart the dev server completely
- Check that `.env` is in the `client/` directory (not root)

## Security Best Practices

1. **Never expose your Firebase config in client-side code** - Always use environment variables
2. **Set up Firebase Security Rules** - Configure rules in Firebase Console → Firestore/Database
3. **Enable App Check** (optional) - For production, enable App Check to prevent abuse
4. **Use Firebase Hosting** - For production deployment, use Firebase Hosting for optimal performance

## Next Steps

After authentication is working:
- Backend token verification will be added in the next phase
- User data will be stored in Firestore or your backend
- Additional auth methods (Google, GitHub) can be added later

---

For more information, visit [Firebase Documentation](https://firebase.google.com/docs/auth/web/start)

