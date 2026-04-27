# Admin Panel Setup Guide - siteTeFL Bulk Email System
## Complete Step-by-Step Configuration

---

## 🎯 Overview

You now have a complete admin panel for managing bulk email campaigns. This guide walks you through setting up the database, configuring email services, and deploying the system.

**What's Ready:**
- ✅ Admin UI components (Dashboard, Contacts, Campaigns, Templates, Analytics, Settings)
- ✅ API routes for CRUD operations
- ✅ Authentication with Clerk (already integrated)
- ✅ Database schema

**What You Need to Do:**
1. Create a Supabase account and database
2. Create database tables from schema.sql
3. Get SendGrid API key
4. Add credentials to .env.local
5. Start the development server

---

## 📊 Step 1: Set Up Supabase Database

### 1.1 Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **Sign Up**
3. Create account with your email
4. Create a new project:
   - **Organization**: Create new (optional)
   - **Project name**: `siteTeFL-admin`
   - **Database password**: Create strong password (save it!)
   - **Region**: Pick closest to your location

**⏱️ Wait 1-2 minutes for project to initialize**

### 1.2 Create Database Tables

Once your project is created:

1. Go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy and paste the entire contents of `schema.sql` (from your project root)
4. Click **RUN** ▶️

This creates all 5 tables:
- `contacts` - Schools, academies, teachers
- `email_campaigns` - Campaign definitions
- `campaign_recipients` - Tracking per email
- `email_templates` - Reusable templates
- `contact_segments` - Contact groups

**✅ Tables are now created**

### 1.3 Get Connection Details

1. Go to **Project Settings** (bottom of left sidebar)
2. Click **Database**
3. Copy **Connection String** (looks like: `postgresql://user:password@host/dbname`)

You'll need this in Step 3.

---

## 🔐 Step 2: Set Up SendGrid Email Service

### 2.1 Create SendGrid Account

1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up with email
3. Verify your email
4. Create sender identity:
   - Go to **Settings** → **Sender Authentication**
   - Click **Verify a Single Sender**
   - Enter your details (must match sender email you want to use)
5. Wait for email confirmation

### 2.2 Get API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name it: `siteTeFL-admin`
4. Select permissions: **Full Access** (or Mail Send + Marketing Campaigns)
5. Click **Create & Copy**
6. **SAVE THIS KEY** - you won't see it again!

Format: `SG.xxxxxxxxxxxxxxxx_xxxxxxxxxxxx`

---

## 🔧 Step 3: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# ===== ADMIN PANEL - SUPABASE DATABASE =====
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# ===== ADMIN PANEL - SENDGRID EMAIL SERVICE =====
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxx_xxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@siteTeFL.com  # Must be verified in SendGrid

# ===== CLERK AUTHENTICATION (already have these) =====
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Where to find these values:

**Supabase URL & Key:**
1. Go to Supabase project
2. Click **Settings** → **API**
3. Copy **Project URL** and **Service Role Key** (anon key won't work for server-side operations)

**SendGrid API Key:**
- Already copied in Step 2.2

---

## ✅ Step 4: Test the Setup

### 4.1 Restart Development Server

```bash
# Stop current server (Ctrl+C if running)
npm run dev
```

### 4.2 Access Admin Panel

1. Go to [http://localhost:3003/admin](http://localhost:3003/admin)
2. Sign in with Clerk (your email)
3. You should see:
   - 📊 Dashboard with stats
   - Navigation sidebar with all sections
   - Empty states (no data yet)

### 4.3 Test Database Connection

Navigate to **Admin Panel → Settings**

Add your SendGrid credentials:
- **SendGrid API Key**: Paste your key
- **Sender Email**: Your verified sender email
- Click **Save Settings**

You should see: ✓ Settings saved successfully

---

## 🚀 Step 5: Start Building Campaigns

### 5.1 Add Your First Contact

1. Go to **Contacts** → Click **➕ Add Contact**
2. Fill in details:
   - Email: (required)
   - Name: (required)
   - Type: School / Academy / Teacher
   - Country: (optional)
3. Click **Create Contact**

### 5.2 Import Contacts from CSV

1. Go to **Contacts** → Click **📤 Import CSV**
2. Upload CSV with columns: `email`, `name`, `type`, `country`
3. Contacts are bulk-imported

### 5.3 Create Email Template

1. Go to **Templates** → Click **➕ New Template**
2. Create template with variables:
   - `{{school_name}}`
   - `{{teacher_count}}`
   - `{{job_count}}`
3. Preview how template renders
4. Save template

### 5.4 Create and Send Campaign

1. Go to **Campaigns** → Click **📧 New Campaign**
2. Step 1: Select template
3. Step 2: Set personalization variables
4. Step 3: Select recipients (all contacts or specific segment)
5. Step 4: Schedule send time
6. Step 5: Review and send

---

## 📊 Database Schema Explanation

### Contacts Table
```sql
- id: Unique identifier
- email: Email address (unique)
- name: Contact name
- type: 'school' | 'academy' | 'teacher'
- country: Country where contact is located
- website: School website URL
- notes: Internal notes
- tags: JSON array for categorization
- unsubscribed: Whether contact unsubscribed
```

### Email Campaigns Table
```sql
- id: Campaign ID
- name: Campaign name
- subject: Email subject
- body: Plain text email body
- html_body: HTML email body
- status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused'
- scheduled_at: When campaign is scheduled
- started_at: When campaign started sending
- recipient_count: Total recipients
- sent_count: How many sent successfully
- opened_count: How many opened email
- clicked_count: How many clicked links
- bounced_count: How many bounced
```

### Campaign Recipients Table (Tracking)
```sql
- campaign_id: Which campaign
- contact_id: Which contact
- status: 'pending' | 'sent' | 'opened' | 'clicked' | 'bounced'
- sent_at: When email was sent
- opened_at: When email was opened
- last_click_at: When link was last clicked
```

### Email Templates Table
```sql
- id: Template ID
- name: Template name
- subject: Email subject template
- body: Email body with {{variables}}
- variables: JSON array of available variables
```

### Contact Segments Table
```sql
- id: Segment ID
- name: Segment name (e.g., "Thai Schools")
- filters: JSON filters applied
- contact_count: How many contacts in segment
```

---

## 🔌 API Routes Reference

### Contacts API
```bash
GET    /api/admin/contacts              # Get all contacts
GET    /api/admin/contacts?type=school  # Filter by type
POST   /api/admin/contacts              # Create contact
GET    /api/admin/contacts/:id          # Get single contact
PUT    /api/admin/contacts/:id          # Update contact
DELETE /api/admin/contacts/:id          # Delete contact
```

### Campaigns API
```bash
GET    /api/admin/campaigns             # Get all campaigns
POST   /api/admin/campaigns             # Create campaign
GET    /api/admin/campaigns/:id         # Get campaign details
POST   /api/admin/campaigns/:id/send    # Send campaign
```

### Templates API
```bash
GET    /api/admin/templates             # Get all templates
POST   /api/admin/templates             # Create template
GET    /api/admin/templates/:id         # Get template
PUT    /api/admin/templates/:id         # Update template
```

### Email Service API
```bash
POST   /api/admin/email/send            # Send single email
POST   /api/admin/email/send-batch      # Send multiple emails
```

---

## 📋 Configuration Checklist

- [ ] Supabase account created
- [ ] Project created
- [ ] Database tables created from schema.sql
- [ ] Connection string saved
- [ ] SendGrid account created
- [ ] Sender identity verified
- [ ] API key created
- [ ] `.env.local` updated with:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `SENDGRID_API_KEY`
  - [ ] `SENDGRID_FROM_EMAIL`
- [ ] Dev server restarted
- [ ] Admin panel accessible at `/admin`
- [ ] First contact created
- [ ] Settings saved

---

## 🐛 Troubleshooting

### "401 Unauthorized" when accessing `/admin`
- Make sure you're signed in with Clerk
- Check that `userId` is returned from `auth()`

### "Failed to fetch contacts"
- Check browser console for error
- Verify Supabase credentials in `.env.local`
- Check Supabase Project Settings → Database for connection string

### "Settings not saving"
- Verify SendGrid API key is correct
- Check that `SENDGRID_API_KEY` is in `.env.local`
- Restart dev server

### "Emails not sending"
- Verify sender email is verified in SendGrid
- Check SendGrid quota (free tier: 100 emails/day)
- Look at SendGrid logs for bounce/error details

---

## 📈 Next Steps After Setup

### Phase 1 MVP (Complete)
- [x] Admin authentication
- [x] Contacts CRUD
- [x] Email templates
- [x] Campaign creation UI
- [ ] SendGrid integration (API routes)
- [ ] Basic metrics

### Phase 2 Enhancements
- [ ] CSV import wizard
- [ ] Drag-and-drop email editor
- [ ] Contact segmentation
- [ ] Campaign scheduling
- [ ] Send time optimization

### Phase 3 Advanced
- [ ] A/B testing
- [ ] Automation workflows
- [ ] Advanced analytics
- [ ] Bounce handling
- [ ] Unsubscribe management

---

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **SendGrid Docs**: https://docs.sendgrid.com
- **Clerk Docs**: https://clerk.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎯 You're Ready!

Your siteTeFL admin panel is now set up and ready to manage bulk email campaigns. Start by:

1. ✅ Complete the configuration checklist above
2. 📧 Create your first email template
3. 👥 Add some test contacts
4. 🚀 Send your first campaign

**Questions?** Check the troubleshooting section or review the API routes documentation.

Good luck! 🎉
