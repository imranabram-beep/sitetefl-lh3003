# Phase 1 Quick Start Guide
## Get 4 Working Government Job APIs in 20-30 minutes

### Prerequisites
- [ ] You have access to your email
- [ ] You have access to https://developer.usajobs.gov/
- [ ] You have access to https://francetravail.io/
- [ ] Your Next.js app is set up on localhost:3003

---

## ✅ Step-by-Step (20-30 minutes)

### 1️⃣ API #1: EURES (EU) - ⭐ No Registration Needed!
**Time**: 0 minutes

The EURES API is public and already integrated. No action needed!

When you run the app, it will automatically fetch jobs from across the European Union.

---

### 2️⃣ API #2: USAJobs (USA) - ⭐ 5 minutes

**In your browser:**
1. Go to: https://developer.usajobs.gov/
2. Click **"Sign Up"** (top right)
3. Create account with your email
4. Verify email (check inbox)
5. Log in
6. Click **"API Keys"** in the left menu
7. Click **"Create New API Key"**
8. Copy the API key shown

**In your terminal:**
```bash
cd /sessions/blissful-kind-ritchie/mnt/siteTEFL\ LH3003
```

**Edit `.env.local`** (line 68-70):
```
USAJOBS_API_KEY=<paste_your_api_key_here>
USAJOBS_USER_AGENT=your_email@example.com
```

Save and close.

---

### 3️⃣ API #3: Bundesagentur (Germany) - ⭐ 5 minutes

**In your browser:**
1. Go to: https://github.com/bundesAPI/jobsuche-api
2. Scroll down to **"Registration"** section
3. Click the registration link
4. Complete registration form
5. You'll receive API key via email within minutes

**In your terminal:**
Open `.env.local` again and update (line 54-56):
```
ARBEITSAGENTUR_API_KEY=<paste_your_api_key_here>
```

Save and close.

---

### 4️⃣ API #4: France Travail (France) - ⭐ 10 minutes

**In your browser:**
1. Go to: https://francetravail.io/
2. Click **"S'inscrire"** (Sign up - top right, in French)
3. Create account with your email
4. Verify email
5. Log in to your account
6. Look for **"Mon Application"** or **"API"** section
7. Click **"Create Application"** or similar
8. Fill in the form (Name: "Teaching Jobs API", or similar)
9. You'll get:
   - `client_id` (long string)
   - `client_secret` (long string)
10. Copy both

**In your terminal:**
Open `.env.local` again and update (line 58-62):
```
FRANCE_TRAVAIL_CLIENT_ID=<paste_your_client_id>
FRANCE_TRAVAIL_CLIENT_SECRET=<paste_your_client_secret>
FRANCE_TRAVAIL_API_HOST=api.francetravail.io
FRANCE_TRAVAIL_TOKEN_URL=https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire
```

Save and close.

---

## 🚀 Test Your Setup

### Start the Next.js app:
```bash
cd /sessions/blissful-kind-ritchie/mnt/siteTEFL\ LH3003
npm run dev
```

You should see:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3003
  - Environments: .env.local
```

### Open in browser:
Go to: **http://localhost:3003/jobs**

You should see:
- Job listings loading
- Jobs from USA, Germany, France, and EU
- Region/country selector working
- "Apply Now" buttons

### Test the backend API directly:
```bash
curl "http://localhost:3003/api/jobs?country=USA"
```

You should get JSON with jobs and metadata showing:
```json
{
  "jobs": [ ... list of jobs ... ],
  "meta": {
    "country": "USA",
    "sources": ["USAJobs", "EURES", "Bundesagentur für Arbeit", "France Travail", ...],
    "total": 50,
    "timestamp": "2026-04-24T..."
  }
}
```

---

## 🐛 Troubleshooting

### Q: No jobs are showing up
**A**: Check that your API keys are correct. Look at the server console for error messages like:
```
USAJobs: API key not configured
Bundesagentur error: 401
```

### Q: I'm getting "API key not configured"
**A**: Make sure you:
1. Updated `.env.local` correctly (no extra spaces)
2. Saved the file
3. Restarted the Next.js dev server (`Ctrl+C` then `npm run dev` again)

### Q: The app crashes when starting
**A**: 
1. Make sure all `.env.local` values don't have leading/trailing spaces
2. If a value is missing, leave it as `your_api_key_here` (the backend will skip that API)
3. Restart with `npm run dev`

---

## ✅ Success Checklist

- [ ] USAJobs API key obtained and added to `.env.local`
- [ ] Bundesagentur API key obtained and added to `.env.local`
- [ ] France Travail client_id and client_secret obtained and added to `.env.local`
- [ ] Next.js app started with `npm run dev`
- [ ] Jobs displaying at http://localhost:3003/jobs
- [ ] At least 10+ jobs visible from different sources
- [ ] Can filter by country/region
- [ ] "Apply Now" buttons work

---

## 🎉 What's Next?

Once Phase 1 is working, you can:

1. **Keep the app running** - Users can search real government jobs from 4 regions
2. **Work on Phase 2** - Email the Asian job boards (Singapore, South Korea, India) and request API access
3. **Work on Phase 3** - Contact the remaining countries for API credentials

See **API_INTEGRATION_ROADMAP.md** for Phase 2 & 3 instructions.

---

## ⏱️ Timeline

- **Now**: Get Phase 1 working (20-30 mins)
- **Tomorrow**: Phase 2 APIs might start responding (2-3 days)
- **Next week**: Phase 3 APIs should be ready (5-7 days)

By the end of 2 weeks, you'll have real government job data from **11 regions across 4 continents**!

