# Government Job APIs Integration Roadmap

## 📊 Status Overview

| # | API | Region | Status | Credentials | Difficulty | Est. Time |
|---|-----|--------|--------|-------------|------------|-----------|
| 1 | **EURES** | Europe (EU-wide) | ✅ Public API | None needed | ⭐ Easy | 0 mins |
| 2 | **USAJobs** | USA | 🔄 Ready | API Key | ⭐⭐ Easy | 5 mins |
| 3 | **Bundesagentur** | Germany | 🔄 Ready | API Key | ⭐⭐ Easy | 5 mins |
| 4 | **France Travail** | France | 🔄 Ready | OAuth2 | ⭐⭐ Easy | 10 mins |
| 5 | **MyCareersFuture** | Singapore | ⏳ Pending | API Key | ⭐⭐⭐ Hard | 2-3 days |
| 6 | **WorkNet** | South Korea | ⏳ Pending | API Key | ⭐⭐⭐ Hard | 3-5 days |
| 7 | **NCS** | India | ⏳ Pending | API Key | ⭐⭐⭐ Hard | 3-5 days |
| 8 | **Lightcast** | Canada | ⏳ Pending | API Key | ⭐⭐⭐ Hard | 2-3 days |
| 9 | **Workforce AU** | Australia | ⏳ Pending | API Key | ⭐⭐⭐ Hard | 2-3 days |
| 10 | **Careers NZ** | New Zealand | ⏳ Pending | API Key | ⭐⭐⭐ Hard | 2-3 days |
| 11 | **Arbetsförmedlingen** | Sweden | ⏳ Pending | API Key | ⭐⭐⭐ Hard | 2-3 days |

---

## 🎯 Phase 1: Quick Wins (Today - Today+1 day)

### API #1: EURES (Europe - EU-wide) ✅ Public API
**Status**: Ready to use immediately - no credentials needed!

**What to do**:
1. The backend code is already integrated
2. When you run the Next.js app at `http://localhost:3003`, it will automatically fetch EU job data
3. No action needed - it's public and working

**Test it**:
```bash
# The app will call this automatically:
curl -s "https://pam-eures-stilling-eksport.nais.oera.no/input/api/jv/v0.1/getAll" \
  -H "Accept: application/json"
```

---

### API #2: USAJobs (USA) 🔄 Ready
**Est. Time**: 5 minutes to register + setup

**Registration Steps**:
1. Go to: https://developer.usajobs.gov/
2. Click "Sign Up" / "Create Account"
3. Verify your email
4. Go to "Developer Portal" → "API Keys"
5. Create a new API key
6. Copy the key

**Setup**:
1. Update your `.env.local` with:
```
USAJOBS_API_KEY=<your_api_key_here>
USAJOBS_USER_AGENT=your_email@example.com
```

2. Test it:
```bash
curl -H "Host: data.usajobs.gov" \
  -H "User-Agent: your_email@example.com" \
  -H "Authorization-Key: YOUR_API_KEY" \
  "https://data.usajobs.gov/api/search?Keyword=english%20teacher&ResultsPerPage=10"
```

---

### API #3: Bundesagentur (Germany) 🔄 Ready
**Est. Time**: 5 minutes to register + setup

**Registration Steps**:
1. Go to: https://github.com/bundesAPI/jobsuche-api#registration
2. Follow the registration link
3. Register for an API key
4. Receive API key via email

**Setup**:
1. Update your `.env.local` with:
```
ARBEITSAGENTUR_API_KEY=<your_api_key_here>
```

2. Test it:
```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  -H "Accept: application/json" \
  "https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/jobs?paginationIndex=0&size=10"
```

---

### API #4: France Travail (France) 🔄 Ready
**Est. Time**: 10 minutes to register + setup

**Registration Steps**:
1. Go to: https://francetravail.io/
2. Click "S'inscrire" (Sign up)
3. Create account with your email
4. Verify email
5. Log in to dashboard
6. Go to "Mon application" → "Créer une application"
7. Fill in the form
8. You'll receive `client_id` and `client_secret`

**Setup**:
1. Update your `.env.local` with:
```
FRANCE_TRAVAIL_CLIENT_ID=<your_client_id>
FRANCE_TRAVAIL_CLIENT_SECRET=<your_client_secret>
FRANCE_TRAVAIL_API_HOST=api.francetravail.io
FRANCE_TRAVAIL_TOKEN_URL=https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire
```

2. Test it (2-step process):
```bash
# Step 1: Get OAuth2 token
TOKEN=$(curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=YOUR_CLIENT_ID&client_secret=YOUR_SECRET" \
  "https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=/partenaire" | jq -r '.access_token')

# Step 2: Search jobs
curl -H "Authorization: Bearer $TOKEN" \
  "https://api.francetravail.io/api/offers/v1/search?keywords=english%20teacher&range=0-100"
```

---

## 📋 Phase 2: Asia APIs (5-7 days)

### API #5: MyCareersFuture (Singapore) ⏳
**Est. Time**: 2-3 days

**Contact**:
- Email: contact@mycareersfuture.gov.sg
- Phone: 6883 5885

**Email Template**:
```
Subject: API Access Request for Job Board Integration

Hi,

I'm integrating your job board API into a teaching job search platform. 
Could you provide API documentation and access credentials for the MyCareersFuture API?

Thank you,
[Your Name]
```

---

### API #6: WorkNet (South Korea) ⏳
**Est. Time**: 3-5 days

**Contact**: https://www.work.go.kr/
- Contact the Ministry of Employment and Labor
- Request API access

---

### API #7: NCS (India) ⏳
**Est. Time**: 3-5 days

**Registration**: https://ncs.gov.in/
- Request API access through the National Career Service portal

---

## 🌏 Phase 3: Americas & Oceania (5-7 days)

### API #8: Lightcast Canada ⏳
**Est. Time**: 2-3 days (Paid)

**Registration**: https://lightcast.io/
- This is a paid service (~$100-500/month)
- Register and request Canada Jobs API access

---

### API #9: Workforce Australia ⏳
**Est. Time**: 2-3 days

**Contact**: https://www.workforceaustralia.gov.au/businesses/about/how-to/connect

---

### API #10: Careers New Zealand ⏳
**Est. Time**: 2-3 days

**Contact**: https://www.careers.govt.nz/
- Request API access directly

---

### API #11: Arbetsförmedlingen (Sweden) ⏳
**Est. Time**: 2-3 days

**Contact**: developer@arbetsformedlingen.se

---

## ✅ Implementation Checklist

### Phase 1 (Do Today):
- [ ] EURES is working (no action needed)
- [ ] Register for USAJobs API key
- [ ] Register for Bundesagentur API key
- [ ] Register for France Travail credentials
- [ ] Update `.env.local` with all Phase 1 credentials
- [ ] Test the Next.js app: `npm run dev`
- [ ] Visit `http://localhost:3003/jobs` and check if jobs are loading

### Phase 2 (Next 1 week):
- [ ] Email MyCareersFuture for API access
- [ ] Contact WorkNet (South Korea) for API access
- [ ] Request NCS (India) API access
- [ ] Update `.env.local` as credentials arrive
- [ ] Test each API as it becomes available

### Phase 3 (Following week):
- [ ] Register for Lightcast (paid) or skip
- [ ] Contact Workforce Australia
- [ ] Contact Careers New Zealand
- [ ] Contact Arbetsförmedlingen
- [ ] Update `.env.local` as credentials arrive
- [ ] Test each API as it becomes available

---

## 🚀 Testing Your Integration

Once you have credentials in `.env.local`:

### Start the app:
```bash
cd /sessions/blissful-kind-ritchie/mnt/siteTEFL\ LH3003
npm run dev
```

Then open: **http://localhost:3003/jobs**

You should see:
1. Job listings from all enabled APIs (those with valid credentials)
2. Job metadata showing which sources returned results
3. Region/country filtering working
4. "Apply Now" buttons linking to actual job boards

### Debug the API:
```bash
# Test the backend directly:
curl "http://localhost:3003/api/jobs?country=Thailand"
```

This will show you:
- How many jobs from each source
- Any errors in the console
- Which APIs are returning data vs. which need credentials

---

## 📝 Notes

**EURES** is the only API that needs NO registration - it's public and already integrated.

**Quick registrations (5-10 mins)**:
- USAJobs
- Bundesagentur  
- France Travail

**Medium registrations (2-3 days)**:
- MyCareersFuture
- Lightcast
- Workforce Australia
- Careers New Zealand

**Hard registrations (3-5 days)**:
- WorkNet
- NCS
- Arbetsförmedlingen

**Recommendation**: Start with Phase 1 today (should take 20-30 minutes to register for all 4), then test the app. As you wait for Phase 2 & 3 credentials, you'll already have real job data from US, Germany, France, and all of EU!

---

## 🔗 Quick Links

| API | Registration | Docs |
|-----|-------------|------|
| EURES | https://github.com/navikt/pam-eures-stilling-eksport | Public API |
| USAJobs | https://developer.usajobs.gov/ | https://developer.usajobs.gov/api-reference/get-api-search |
| Bundesagentur | https://github.com/bundesAPI/jobsuche-api | https://github.com/bundesAPI/jobsuche-api |
| France Travail | https://francetravail.io/ | https://api.gouv.fr/les-api/api_offresdemplois |
| MyCareersFuture | contact@mycareersfuture.gov.sg | Limited |
| WorkNet | https://www.work.go.kr/ | Limited |
| NCS | https://ncs.gov.in/ | Limited |
| Lightcast | https://lightcast.io/ | Paid |
| Workforce AU | https://www.workforceaustralia.gov.au/businesses/about/how-to/connect | Limited |
| Careers NZ | https://www.careers.govt.nz/ | Limited |
| Arbetsförmedlingen | developer@arbetsformedlingen.se | Limited |

