# Phase 2: Asia Government Job APIs
## Integrate Singapore, South Korea, India Job Boards

---

## 📋 Phase 2 Overview

| # | API | Country | Status | Contact | Est. Time |
|---|-----|---------|--------|---------|-----------|
| 1 | MyCareersFuture | Singapore | 🔄 Ready to contact | Email/Phone | 2-3 days |
| 2 | WorkNet | South Korea | 🔄 Ready to contact | Website form | 3-5 days |
| 3 | NCS | India | 🔄 Ready to contact | Online portal | 3-5 days |

---

## 🚀 Action Plan

### API #1: MyCareersFuture (Singapore) 🇸🇬

**What it is:** Singapore's official government job portal

**Contact Methods:**
- Email: **contact@mycareersfuture.gov.sg**
- Phone: **6883 5885** (Employer inquiries)
- Website: https://www.mycareersfuture.gov.sg/

**Email Template:**
```
Subject: API Access Request - Teaching Jobs Platform Integration

Hi MyCareersFuture Team,

I am integrating your job board API into a teaching job search platform 
(siteTeFL) to help job seekers find opportunities across multiple regions.

Could you please provide:
1. API documentation for MyCareersFuture
2. API access credentials/authentication details
3. Any developer registration requirements

Thank you for your assistance.

Best regards,
Imran
imran.abram@gmail.com
```

**Est. Wait Time:** 2-3 days

---

### API #2: WorkNet (South Korea) 🇰🇷

**What it is:** South Korea's Ministry of Employment and Labor job board

**Contact Methods:**
- Website: https://www.work.go.kr/
- Look for "API", "Developer", or "Open API" section
- May need to register through their developer portal

**Email Template (if email address found):**
```
Subject: API Access Request for Job Board Integration

Hi WorkNet Team,

I am developing a teaching job search platform and would like to integrate 
the WorkNet API to provide Korean job opportunities to job seekers.

Could you please provide:
1. API documentation and endpoints
2. Registration process for API access
3. Required authentication credentials

Thank you.

Best regards,
Imran
imran.abram@gmail.com
```

**Est. Wait Time:** 3-5 days

---

### API #3: NCS (India) 🇮🇳

**What it is:** India's National Career Service - Government job portal

**Contact Methods:**
- Website: https://ncs.gov.in/
- Look for "API", "Developers", or "Integration" section
- May have self-serve registration portal

**Email Template:**
```
Subject: API Access Request - Teaching Jobs Platform

Hi NCS Team,

I am integrating the National Career Service API into a teaching job 
search platform to provide Indian job opportunities.

Could you please provide:
1. API documentation
2. How to register for API access
3. Authentication requirements

Thank you for your support.

Best regards,
Imran
imran.abram@gmail.com
```

**Est. Wait Time:** 3-5 days

---

## ✅ Action Checklist - Phase 2

### Send Registrations (Today)
- [ ] Email MyCareersFuture (contact@mycareersfuture.gov.sg)
- [ ] Contact WorkNet (via website form or email)
- [ ] Contact NCS India (via website portal or email)

### As Credentials Arrive (Days 1-5)
- [ ] MyCareersFuture key arrives → Add to .env.local
- [ ] WorkNet key arrives → Add to .env.local
- [ ] NCS key arrives → Add to .env.local

### Testing (As each arrives)
- [ ] Test MyCareersFuture endpoint
- [ ] Verify Singapore jobs display on /jobs page
- [ ] Test WorkNet endpoint
- [ ] Verify South Korea jobs display on /jobs page
- [ ] Test NCS endpoint
- [ ] Verify India jobs display on /jobs page

### Final Verification
- [ ] All 3 Asia APIs returning data
- [ ] No console errors
- [ ] Jobs from all 3 countries visible
- [ ] App still running smoothly

---

## 📋 .env.local Locations

When credentials arrive, add them here:

**Line 39-40: Singapore**
```
MYCAREERSFUTURE_API_KEY=<your_key_here>
MYCAREERSFUTURE_API_HOST=api.mycareersfuture.gov.sg
```

**Line 46-48: South Korea**
```
WORKNET_API_KEY=<your_key_here>
WORKNET_API_HOST=api.work.go.kr
```

**Line 42-44: India**
```
NCS_API_KEY=<your_key_here>
NCS_API_HOST=api.ncs.gov.in
```

---

## 🧪 Testing Commands

Once you have credentials, test each API:

### MyCareersFuture
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.mycareersfuture.gov.sg/api/jobs/search?keywords=english%20teacher&limit=10"
```

### WorkNet
```bash
curl -H "Authorization: YOUR_API_KEY" \
  "https://api.work.go.kr/api/jobs/search?keyword=english&limit=10"
```

### NCS
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.ncs.gov.in/jobs/search?keyword=english&limit=10"
```

---

## 📈 Expected Results

Once Phase 2 is complete, your system will have:

- **6 Government Job APIs** (Phase 1 + Phase 2)
- **Jobs from 7+ countries** (USA, Germany, France, EU, Singapore, S. Korea, India)
- **Real, verified job listings** from official government sources
- **Coverage across Asia, Europe, Americas**

---

## 🔗 Reference Links

| API | Registration | Status Check |
|-----|-------------|-------------|
| MyCareersFuture | contact@mycareersfuture.gov.sg | https://www.mycareersfuture.gov.sg/ |
| WorkNet | https://www.work.go.kr/ | Check developer section |
| NCS | https://ncs.gov.in/ | Check API/Developer section |

---

## ⏱️ Timeline

- **Today:** Send 3 registration requests
- **Days 1-5:** Credentials arrive (typically 2-5 days per API)
- **Days 2-6:** Test and verify each API as credentials arrive
- **Day 7:** Phase 2 complete with all 3 Asia APIs integrated

**By next week:** You'll have real Asian job data flowing! 🎉

