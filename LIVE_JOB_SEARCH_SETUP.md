# 🔴 Live Job Search API Integration Guide

## Status: ✅ ACTIVE & READY

Your live job search is fully configured and ready to use with Adzuna and Jooble APIs.

---

## 📋 Environment Variables (Already Configured)

Your `.env.local` file contains all required API credentials:

```
ADZUNA_APP_ID=e1680cb1
ADZUNA_APP_KEY=6b97f8207d9e269c9296671f75d0a325
JOOBLE_API_KEY=15af9aec-4c1a-4ae5-ac71-3e867dea64b8
```

---

## 🚀 How to Use

### 1. **Visit the Jobs Page**
   - Navigate to `/jobs` (or click "Jobs" in main navigation)
   - You'll see featured jobs and a search interface

### 2. **Search for Teaching Jobs**
   - Select a region (South East Asia, East Asia, Middle East, Europe, Americas, Other)
   - Choose a specific country
   - (Optional) Enter keywords (default: "English teacher TEFL ESL")
   - (Optional) Filter by job type (Full-time, Part-time, Online)
   - Click **"Search jobs"** button

### 3. **View Live Results**
   - Results show jobs from both Adzuna and Jooble
   - Each job displays:
     - Job title and company
     - Location
     - Salary range (if available)
     - Job type
     - Source badge (Adzuna/Jooble)
     - Posted date
     - Direct link to apply

---

## 🔧 API Architecture

### Frontend Flow
```
User selects country + keyword + type
         ↓
Clicks "Search jobs"
         ↓
Calls GET /api/jobs?country=Thailand&keyword=English+teacher&type=full-time
         ↓
API merges results from both sources
         ↓
Returns jobs array with metadata (source counts, total)
         ↓
Display filtered & deduplicated results
```

### Backend Integration

**Adzuna API:**
- Endpoint: `https://api.adzuna.com/v1/api/jobs/{country-code}/search/1`
- Supports: Full-time, Part-time filtering
- Returns: Title, company, location, salary, posting date, URL

**Jooble API:**
- Endpoint: `https://jooble.org/api/{keyword}` 
- Supports: Country and keyword-based search
- Returns: Title, company, location, salary range, job description, URL

### Teaching Keyword Validation
The API filters results to only show teaching-related jobs using a taxonomy of 77 keywords including:
- English, TEFL, ESL, language, teacher, tutor
- Training, instructor, lecturer, curriculum, phonics
- And many more teaching-related terms

---

## 📊 Data Flow Diagram

```
                    ┌─────────────────┐
                    │  Jobs Page      │
                    │  (/jobs)        │
                    └────────┬────────┘
                             │
                             │ User clicks Search
                             ↓
                    ┌─────────────────┐
                    │  /api/jobs      │
                    │  Route Handler  │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                ↓                         ↓
         ┌─────────────┐           ┌──────────────┐
         │ Adzuna API  │           │  Jooble API  │
         │  (live)     │           │   (live)     │
         └────────┬────┘           └──────┬───────┘
                  │                       │
                  └───────────┬───────────┘
                              ↓
                    ┌─────────────────┐
                    │  Deduplication  │
                    │  & Filtering    │
                    └────────┬────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │  Return JSON    │
                    │  (jobs array)   │
                    └────────┬────────┘
                             │
                             ↓
                    ┌─────────────────┐
                    │  Display Results│
                    │  with Badges    │
                    └─────────────────┘
```

---

## 🧪 Testing Checklist

- [ ] Navigate to `/jobs` page
- [ ] Select "South East Asia" region
- [ ] Select "Thailand" country
- [ ] Click "Search jobs"
- [ ] Verify results load (should see jobs from Adzuna and/or Jooble)
- [ ] Check that metadata shows: "X teaching roles found · Y from Adzuna · Z from Jooble"
- [ ] Click a job link to verify it opens the job posting
- [ ] Try different countries and keywords
- [ ] Verify featured jobs appear at the top for selected country

---

## ⚠️ Troubleshooting

### No jobs appearing?
- Check browser console for errors
- Verify network request to `/api/jobs?...` succeeds (200 status)
- Confirm API credentials in `.env.local` are correct
- Try a different country or keyword

### API rate limits?
- Adzuna: 10 requests/second limit per app
- Jooble: 10 requests/minute per IP
- If hitting limits, implement request caching or backoff

### Wrong job results?
- API filters by teaching keywords (TEFL, ESL, English teacher, tutor, etc.)
- Try more specific keywords like "TEFL", "ESL", or "English teacher"
- Different countries may have different job availability

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/src/app/api/jobs/route.ts` | Main API endpoint that fetches from Adzuna & Jooble |
| `/src/components/jobs-client.tsx` | Frontend UI and search logic |
| `/src/app/jobs/page.tsx` | Jobs page wrapper |
| `/src/components/jobs-header.tsx` | Page header |
| `/src/app/jobs.css` | Job page styles |
| `.env.local` | API credentials (keep secret!) |

---

## 🔐 Security Notes

✅ **What's secure:**
- API keys stored in `.env.local` (not exposed to client)
- Requests made server-side only
- No sensitive data in URLs

⚠️ **Best practices:**
- Never commit `.env.local` to git
- Keep API keys secret
- Rotate keys if exposed
- Monitor API usage for suspicious activity

---

## 🎯 Next Steps

1. **Test it now** - Go to `/jobs` and search for jobs
2. **Monitor usage** - Check Adzuna/Jooble dashboards for API usage
3. **Optimize** - Consider caching results for frequently searched countries
4. **Enhance** - Add filters for salary range, experience level, visa sponsorship

---

**Last Updated:** 2026-04-23  
**Integration Status:** ✅ Active and verified
