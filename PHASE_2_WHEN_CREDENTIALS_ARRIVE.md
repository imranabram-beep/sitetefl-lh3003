# Phase 2: Quick Action When Credentials Arrive
## Singapore, South Korea, India APIs - Immediate Setup

---

## 🎯 THE PLAN

**Goal:** When you receive API credentials from Asia job boards, add them to .env.local and test immediately.

**Time per API:** ~3 minutes

---

## 📬 MyCareersFuture (Singapore) - WHEN IT ARRIVES

**What to expect:** Email from contact@mycareersfuture.gov.sg with API key

**Steps (3 minutes):**

1. **Copy the API key** from their email
2. Open `.env.local`
3. Find line 39: `MYCAREERSFUTURE_API_KEY=your_api_key_here`
4. Replace with: `MYCAREERSFUTURE_API_KEY=<paste-key-here>`
5. Save file
6. Restart app: `npm run dev`
7. Visit http://localhost:3003/jobs
8. Check for Singapore jobs 🇸🇬

**Expected Result:**
- Jobs from Singapore displayed
- Company names, positions, salaries visible
- "Apply Now" buttons working

---

## 📬 WorkNet (South Korea) - WHEN IT ARRIVES

**What to expect:** Email with authKey or API key

**Steps (3 minutes):**

1. **Copy the authKey** from their email
2. Open `.env.local`
3. Find line 46: `WORKNET_API_KEY=your_api_key_here`
4. Replace with: `WORKNET_API_KEY=<paste-authkey-here>`
5. Save file
6. Restart app: `npm run dev`
7. Visit http://localhost:3003/jobs
8. Check for South Korea jobs 🇰🇷

**Expected Result:**
- Jobs from South Korea displayed
- Korean job titles and companies visible
- Salary information in Korean Won

---

## 📬 NCS (India) - WHEN IT ARRIVES

**What to expect:** Email with API key or registration portal instructions

**Steps (3 minutes):**

1. **Copy the API key** from their email
2. Open `.env.local`
3. Find line 42: `NCS_API_KEY=your_api_key_here`
4. Replace with: `NCS_API_KEY=<paste-key-here>`
5. Save file
6. Restart app: `npm run dev`
7. Visit http://localhost:3003/jobs
8. Check for India jobs 🇮🇳

**Expected Result:**
- Jobs from India displayed
- Teaching positions, salaries visible
- "Apply Now" buttons functional

---

## ✅ Verification Checklist

For EACH API when added:

- [ ] **Email received** with credentials
- [ ] **Key copied** accurately
- [ ] **.env.local updated** (no typos)
- [ ] **File saved** (Ctrl+S)
- [ ] **App restarted** (npm run dev)
- [ ] **No errors** in terminal
- [ ] **Jobs visible** at http://localhost:3003/jobs
- [ ] **Jobs from correct country** showing
- [ ] **Multiple jobs visible** (not just 1)

---

## 🔍 Troubleshooting

### If jobs don't appear after adding credentials:

1. **Check terminal** for error messages
2. **Restart app** again: `npm run dev`
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Reload page** (Ctrl+R)
5. **Check .env.local** - make sure key is exactly as received

### If you see error messages:

- **"API key not configured"** → Key not added to .env.local
- **"401 Unauthorized"** → Key is wrong or expired
- **"0 jobs"** → API is working but no jobs match the search
- **Network error** → API server might be down

---

## 📊 Success Timeline

```
Today:
  - Phase 1 working: 10 German jobs
  
Days 2-3:
  - MyCareersFuture arrives
  - Add to .env.local
  - Test → Singapore jobs appear! 🇸🇬

Days 3-5:
  - WorkNet arrives
  - Add to .env.local
  - Test → South Korea jobs appear! 🇰🇷
  
  - NCS arrives
  - Add to .env.local
  - Test → India jobs appear! 🇮🇳

Final Result:
  - Real jobs from 4 countries
  - Germany: 10 jobs
  - Singapore: X jobs
  - South Korea: X jobs
  - India: X jobs
  - TOTAL: 30+ real government jobs! 🚀
```

---

## 💡 Important Notes

1. **Credentials are SENSITIVE** - Don't share them or commit to git
2. **Keep backups** - Save the credentials somewhere safe
3. **One at a time** - Add and test each API individually
4. **Watch the logs** - Terminal will show if APIs work or fail
5. **Be patient** - APIs may take 3-5 business days to respond

---

## 🎯 Next Phase

Once Phase 2 is complete with all 3 Asia APIs working:
1. You'll have real jobs from 4 countries
2. Can then focus on Phase 3 (Americas + Oceania)
3. Or refine the existing Phase 1 APIs if needed

---

**READY?** Just wait for those emails and follow these steps! ✉️📧📬

The backend is ready. The .env.local file is ready.  
All you need is the credentials to arrive! 🎉

