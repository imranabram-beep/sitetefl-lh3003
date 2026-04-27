# Admin Panel - Quick Start Checklist
## Get the Email System Running in 30 Minutes

---

## 🚀 30-Minute Setup

### ⏱️ STEP 1: Supabase Setup (10 minutes)

- [ ] Go to [supabase.com](https://supabase.com) and sign up
- [ ] Create new project named `siteTeFL-admin`
- [ ] Wait for database to initialize
- [ ] Go to **SQL Editor** → **New Query**
- [ ] Copy entire `schema.sql` file and paste it
- [ ] Click **RUN** ▶️
- [ ] Go to **Settings** → **API** and copy:
  - [ ] **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
  - [ ] **Service Role Key** (SUPABASE_SERVICE_ROLE_KEY)

### ⏱️ STEP 2: SendGrid Setup (10 minutes)

- [ ] Go to [sendgrid.com](https://sendgrid.com) and sign up
- [ ] Go to **Settings** → **Sender Authentication**
- [ ] Click **Verify a Single Sender** and complete the process
- [ ] Go to **Settings** → **API Keys**
- [ ] Click **Create API Key** and name it `siteTeFL-admin`
- [ ] Copy the key (looks like: `SG.xxxxx...`)

### ⏱️ STEP 3: Environment Variables (5 minutes)

Add these to your `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@siteTeFL.com
```

### ⏱️ STEP 4: Test (5 minutes)

```bash
# Restart server
npm run dev
```

Then:
- [ ] Go to http://localhost:3003/admin
- [ ] Sign in with Clerk
- [ ] Check Dashboard shows (no errors)
- [ ] Go to Settings and add SendGrid API key
- [ ] Click **Save Settings** → should see ✓

---

## ✅ Success!

Your admin panel is now ready to:
- 👥 Manage contacts
- 📧 Create email templates
- 📬 Build and send campaigns
- 📊 Track analytics

---

## 📊 What You Can Do Now

### Quick Test Email Campaign:

1. **Add a Contact**
   - Go to `/admin/contacts`
   - Click **➕ Add Contact**
   - Email: `test@example.com`
   - Name: `Test School`
   - Type: `School`
   - Click Create

2. **Create Template**
   - Go to `/admin/templates`
   - Click **➕ New Template**
   - Name: `Welcome Email`
   - Subject: `Welcome to siteTeFL`
   - Body: `Hi {{school_name}}, we'd love to work with you!`
   - Click Create

3. **Send Campaign**
   - Go to `/admin/campaigns`
   - Click **📧 New Campaign**
   - Select template
   - Add recipients
   - Review and send

---

## 🔧 If Something Goes Wrong

### Error: "Unauthorized" on /admin
- Make sure you're signed in with Clerk
- Check that your email is registered

### Error: "Failed to fetch"
- Check browser console (F12) for details
- Verify `.env.local` has all 4 environment variables
- Restart server: `npm run dev`

### Can't find Supabase credentials
- Go to your project in Supabase
- Click **Settings** (bottom left)
- Click **API**
- Copy the URL and Service Role Key

### Can't find SendGrid API key
- Go to sendgrid.com dashboard
- Click **Settings** → **API Keys**
- Click **Create API Key** (the old key won't reappear)

---

## 📚 Full Documentation

For complete setup details, see: **ADMIN_PANEL_SETUP_GUIDE.md**

---

## 🎯 Next Phase (Optional)

After basic setup works:

### Add CSV Import
- Bulk upload contacts from CSV file
- Auto-parse and validate emails

### Add Campaign Scheduling
- Schedule emails to send at specific times
- Timezone-aware scheduling

### Add Email Builder
- Drag-and-drop template editor
- HTML email designer
- Real-time preview

### Add Analytics Dashboard
- Open rates over time
- Click-through rates
- Engagement charts
- Bounce rate tracking

---

**You're ready! 🎉 Start with Supabase setup above.**
