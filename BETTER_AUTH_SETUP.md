# Better Auth Setup Guide

## Environment Variables Required

Add these environment variables to your `.env.local` file:

```bash
# Better Auth Configuration
BETTER_AUTH_SECRET=

# Google OAuth Configuration (get from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Database Configuration (already exists)
DATABASE_URL=your_postgres_database_url_here

# Production URL (optional)
BETTER_AUTH_URL=https://your-production-domain.com
```

## Google OAuth Setup Instructions

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

### 2. Enable Google+ API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" and enable it

### 3. Create OAuth Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`

### 4. Get Your Credentials
1. After creating, you'll get a Client ID and Client Secret
2. Add these to your `.env.local` file as shown above

## Database Migration

After setting up the environment variables, run the database migration:

```bash
npx @better-auth/cli migrate
```

This will create all the necessary tables for Better Auth in your PostgreSQL database.

## Testing the Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/login`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth page
5. After signing in, you'll be redirected to `/demo`

## Troubleshooting

- Make sure your `DATABASE_URL` is correct and the database is running
- Verify your Google OAuth credentials are correct
- Check that the redirect URI in Google Cloud Console matches your setup
- Ensure the Better Auth secret is set (the one provided is for testing only)

## Production Deployment

When deploying to production:

1. Change `BETTER_AUTH_URL` to your production domain
2. Update Google OAuth redirect URIs in Google Cloud Console
3. Generate a new `BETTER_AUTH_SECRET` for production
4. Run the migration on your production database
