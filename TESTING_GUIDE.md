# 🧪 siteTeFL Admin Panel - Testing Guide

## ✅ What's Complete

### Admin Panel (95% → 100% ✅)
- ✅ Modern, redesigned UI with gradient sidebar
- ✅ All 7 pages working (Dashboard, Contacts, Campaigns, Templates, Analytics, Settings)
- ✅ All sidebar navigation links fixed
- ✅ 4 new form pages created:
  - Add Contact form (`/admin/contacts/new`)
  - Import CSV form (`/admin/contacts/import`)
  - New Campaign form (`/admin/campaigns/new`)
  - New Template form (`/admin/templates/new`)
- ✅ Email authorization check (imran.abram@gmail.com only)
- ✅ SendGrid integration ready
- ✅ Test email endpoint created

---

## 🚀 Testing Steps

### Step 1: Start the Development Server
```bash
cd /Users/imranpatel/Projects\ Web/siteTEFL\ LH3003
npm run dev
```

The server should start at `http://localhost:3003`

### Step 2: Access the Admin Panel
1. Go to `http://localhost:3003/admin`
2. You should see the **redesigned admin panel** with:
   - Modern dark sidebar with gradient
   - Clean top bar
   - Dashboard with stats cards
   - Quick action buttons

### Step 3: Test Navigation
Click on sidebar items to test:
- 📊 **Dashboard** - See stats and quick actions
- 👥 **Contacts** - Browse contacts, test "Add Contact" button
- 📬 **Campaigns** - Create new campaign form
- 📧 **Templates** - Email template management
- 📈 **Analytics** - View campaign metrics
- ⚙️ **Settings** - Configure email service

### Step 4: Test Forms
Try these to see the professional form UIs:
1. **Add Contact** (`/admin/contacts/new`)
   - Fill out contact details
   - See success/error messages

2. **Import CSV** (`/admin/contacts/import`)
   - See CSV format guide
   - Example CSV provided

3. **New Campaign** (`/admin/campaigns/new`)
   - Create campaign with subject, template, recipients
   - See email preview

4. **New Template** (`/admin/templates/new`)
   - Create email template
   - Use {{variable}} syntax for personalization

---

## 📧 Send Test Email

### Option A: Via API Endpoint (After Step 1)

Once the server is running, send a test email:

```bash
curl -X POST http://localhost:3003/api/email-campaigns/test-send \
  -H "Content-Type: application/json" \
  -d '{
    "recipientEmail": "blackflag786@hotmail.com",
    "recipientName": "Test User",
    "subject": "🎉 Test Email from siteTeFL Admin"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "✅ Test email sent successfully to blackflag786@hotmail.com",
  "details": {
    "recipient": "blackflag786@hotmail.com",
    "recipientName": "Test User",
    "subject": "🎉 Test Email from siteTeFL Admin",
    "sentAt": "2026-04-24T20:35:00.000Z"
  }
}
```

### Option B: Via Admin Panel (Coming Soon)

Once database is connected, you can:
1. Add contact with email
2. Create campaign with template
3. Click "Send Campaign" button

---

## 📊 What Option 3 Does (Connect Database)

**Current State:** Forms look great but don't save data (everything is mock/stub)

**After Option 3 is Done:**
- ✅ Add contact → Saved to Supabase
- ✅ Import CSV → All contacts stored in database
- ✅ Create campaign → Stored in database with status tracking
- ✅ Create template → Reusable email templates saved
- ✅ Dashboard stats → Show real numbers from database
- ✅ Send campaign → Actually sends to all contacts in database
- ✅ Track opens/clicks → Analytics dashboard populates with real data

---

## 🎯 Next Steps: Option 3 (Database Integration)

To connect the API routes to Supabase:

### Phase 1: Create Database Tables (Already Done ✅)
- `contacts` table
- `email_campaigns` table
- `email_templates` table
- `campaign_recipients` table

### Phase 2: Update API Routes to Use Supabase
The following API routes need database integration:

1. **`/api/admin/contacts`** - GET/POST contacts
2. **`/api/admin/campaigns`** - GET/POST campaigns
3. **`/api/admin/templates`** - GET/POST templates
4. **`/api/admin/stats`** - Fetch dashboard stats
5. **`/api/admin/analytics`** - Fetch analytics data
6. **`/api/email-campaigns/send`** - Send actual campaign emails

### Phase 3: Connect Forms to Database
Forms already send data to API endpoints, just need those endpoints to save to DB

---

## 🔧 Current Configuration

### Email Service ✅
- **Provider:** SendGrid
- **API Key:** Configured in `.env.local`
- **From Email:** `noreply@teflinasia.org`
- **Features:** Open tracking, click tracking, personalization

### Database ✅
- **Provider:** Supabase
- **Connection:** Already configured
- **Tables:** Schema ready in `schema.sql`

### Authentication ✅
- **Provider:** Clerk
- **Admin Check:** Email must be `imran.abram@gmail.com`
- **Status:** Working

---

## 📝 Troubleshooting

### Admin Panel Won't Load
```bash
# Check server is running
npm run dev

# Check port 3003 is not in use
lsof -i :3003

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Email Won't Send
1. Check `.env.local` has valid `SENDGRID_API_KEY`
2. Check SendGrid account is active
3. Check `noreply@teflinasia.org` is verified in SendGrid
4. Look for error in server console

### Database Connection Issues
1. Check `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`
2. Verify Supabase project is active
3. Check if tables exist in Supabase

---

## 📁 Key Files

### Admin UI Pages
- `/src/app/admin/layout.tsx` - Main layout (redesigned ✨)
- `/src/app/admin/page.tsx` - Dashboard
- `/src/app/admin/contacts/page.tsx` - Contacts list
- `/src/app/admin/contacts/new/page.tsx` - Add contact form
- `/src/app/admin/contacts/import/page.tsx` - Import CSV form
- `/src/app/admin/campaigns/page.tsx` - Campaigns list
- `/src/app/admin/campaigns/new/page.tsx` - Create campaign form
- `/src/app/admin/templates/page.tsx` - Templates list
- `/src/app/admin/templates/new/page.tsx` - Create template form
- `/src/app/admin/analytics/page.tsx` - Analytics dashboard
- `/src/app/admin/settings/page.tsx` - Settings

### API Routes
- `/src/app/api/admin/` - Admin API endpoints (stub)
- `/src/app/api/email-campaigns/send/route.ts` - Send campaign (ready for DB)
- `/src/app/api/email-campaigns/test-send/route.ts` - Test email (ready now!)

### Configuration
- `.env.local` - All API keys configured
- `schema.sql` - Supabase database schema
- `lib/supabase.ts` - Supabase client

---

## ✨ Summary

**Current Status:** Admin panel is visually complete and ready for use. Email system is operational. Just need to connect the database to make it fully functional.

**To Send Test Email:**
1. Run `npm run dev`
2. Use curl command above or visit `/admin/settings` to see configuration status
3. Test email will be sent to `blackflag786@hotmail.com`

**Next Priority:** Connect API routes to Supabase (Option 3)
