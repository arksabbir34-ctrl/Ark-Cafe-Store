# Netlify Deployment Setup

This project is a **full-stack application** with React frontend + Express backend. Here's how to deploy it to Netlify:

## Frontend Deployment (Recommended)

The frontend is built as a static site and deploys to Netlify automatically.

### 1. **Prepare for Deployment**

The `netlify.toml` is already configured with:
- Build command: `npm run build`
- Publish directory: `dist/public` (Vite output)
- SPA redirects: All routes redirect to `index.html` for React Router to handle

### 2. **Deploy Frontend to Netlify**

1. Connect your GitHub repository to Netlify
2. Netlify will auto-detect `netlify.toml` and deploy
3. The frontend will build and deploy automatically on each push

## Backend Deployment

Since Netlify doesn't support long-running Express servers, you have two options:

### **Option A: Host Backend Separately (Recommended)**

Deploy the backend to:
- **Railway** (easiest - directly deploy Node.js app)
- **Heroku** (free tier available)
- **Render** (similar to Railway)
- **DigitalOcean App Platform**

**Steps:**
1. Deploy backend to Railway/Heroku with `npm start`
2. Get your backend URL (e.g., `https://your-backend.railway.app`)
3. Update frontend API calls to use this URL

**In your frontend**, update the API base URL:

```typescript
// client/src/lib/queryClient.ts
const API_URL = process.env.VITE_API_URL || 'https://your-backend.railway.app';
```

Add to `.env` (local development):
```
VITE_API_URL=http://localhost:5000
```

### **Option B: Netlify Functions (Advanced)**

Convert Express routes to Netlify Functions and redeploy. This requires:
1. Creating `netlify/functions/` directory
2. Converting each API endpoint to a function
3. Updating environment variables

## Quick Checklist

- ✅ Frontend: Builds to `dist/public`
- ✅ SPA redirects: Configured in `netlify.toml`
- ❌ Backend: Needs separate hosting (Railway, Heroku, Replit, etc.)
- ⚠️ Database: PostgreSQL must be accessible from both frontend and backend
- ✅ CORS: Enabled in Express backend

## Environment Variables on Netlify

**CRITICAL**: Set this in Netlify dashboard to connect frontend to backend.

### Method 1: Via Site Settings (Recommended)

1. Open your site in **Netlify Dashboard**
2. Click your **site name** to open site overview
3. Click **Site Settings** (in the top navigation bar)
4. In the left sidebar, click **Build & Deploy**
5. Look for **Environment** section (may be labeled "Environment variables")
6. Click the **Edit variables** or **Create a new variable** button
7. Add a new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com`

### Method 2: Via Deploy Settings (Alternative)

1. Open **Netlify Dashboard** → Your site
2. Click **Deploys** tab (top menu)
3. Look for "Triggering" or "Deploy settings"
4. Scroll to "Build environment variables"
5. Click to add variable

### Method 3: Fastest Method (Direct Link)

Replace `YOUR-SITE-NAME` with your site name and visit directly:
```
https://app.netlify.com/sites/YOUR-SITE-NAME/configuration/env
```

For example, if your site is `arkcafestore`:
```
https://app.netlify.com/sites/arkcafestore/configuration/env
```

### What to Add

**Key:**
```
VITE_API_URL
```

**Value:** (Get this from your Replit webview URL)
```
https://your-project.replit.dev
```

**Example with real values:**
```
Key:   VITE_API_URL
Value: https://my-ark-cafe.replit.dev
```

### 4. Save and Redeploy

1. Click **Create variable** or **Save**
2. Trigger a redeploy:
   - Option A: Push a change to GitHub (auto-deploys)
   - Option B: In Netlify dashboard, click **Deploys** → **Trigger deploy** → **Deploy site**
3. Wait 1-2 minutes for deployment
4. Visit your site and scroll to menu - products should appear! ✅

### For the Replit Backend:

Set this environment variable in Replit to allow Netlify:

```
FRONTEND_URL=https://your-site.netlify.app
```

This enables CORS so the frontend can call the API.

## Troubleshooting

**"API calls 404"**: Backend URL is wrong or backend isn't running. Check `VITE_API_URL`.

**"Database connection failed"**: DATABASE_URL not set or PostgreSQL not accessible from backend host.

**"React Router shows 404"**: Check that `netlify.toml` redirects are configured (they are by default).

## Summary

1. **Frontend**: Automatically deploys to Netlify from this repo
2. **Backend**: Deploy separately to Railway/Heroku
3. **Database**: Use Replit's PostgreSQL or external service (Neon, Supabase)

Your app is **deployment-ready**! Just connect to Netlify and deploy your backend separately.
