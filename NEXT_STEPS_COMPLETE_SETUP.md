# Complete Setup: From Zero to Sending Emails
## Step-by-Step Guide to Activate Your Email System

---

## 🎯 What You Now Have

✅ **Admin UI** - 6 pages for managing campaigns, contacts, templates  
✅ **API Routes** - All CRUD endpoints created  
✅ **Email Sending** - SendGrid integration ready (`/api/email-campaigns/send`)  
✅ **Email Tracking** - Unsubscribe & webhook handling (`/api/unsubscribe`)  
✅ **Database Schema** - 5 tables ready in schema.sql  

**What's Left:** Connect the database and email service.

---

## 🚀 STEP 1: Install Required Packages (5 minutes)

Run this command to install SendGrid and Supabase clients:

```bash
npm install @sendgrid/mail @supabase/supabase-js
```

---

## 🔧 STEP 2: Create Supabase Client (10 minutes)

Create this file to connect your app to Supabase:

**File:** `lib/supabase.ts`

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);
```

---

## 📊 STEP 3: Set Up Supabase Database (15 minutes)

### 3.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **New Project**
   - **Project Name:** `siteTeFL-admin`
   - **Database Password:** Save this somewhere safe!
   - **Region:** Pick closest to you
4. Click **Create new project**
5. ⏳ **Wait 2-3 minutes** for database to initialize

### 3.2 Create Database Tables

Once initialized:

1. Go to **SQL Editor** in left sidebar
2. Click **New Query**
3. Copy entire contents of `schema.sql` file
4. Paste it in the editor
5. Click **RUN** button

**Result:** All 5 tables created ✅

### 3.3 Get Your Credentials

1. Click **Settings** → **API** (bottom of left sidebar)
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Service Role Key** (looks like: `eyJhbGc...`)

---

## 📧 STEP 4: Set Up SendGrid (15 minutes)

### 4.1 Create SendGrid Account

1. Go to [sendgrid.com](https://sendgrid.com)
2. Click **Sign Up**
3. Fill in details and verify email
4. Complete account setup

### 4.2 Verify Sender Email

1. Go to **Settings** → **Sender Authentication** (left sidebar)
2. Click **Verify a Single Sender**
3. Fill in your sender details:
   - **From Email:** `noreply@siteTeFL.com` (or your domain)
   - **From Name:** `siteTeFL`
   - **Company:** (your company)
   - etc.
4. Submit
5. **Check your email** for verification link
6. Click the link to verify

### 4.3 Create API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name: `siteTeFL-admin`
4. Permissions: **Full Access**
5. Click **Create & Copy**
6. **SAVE THIS KEY IMMEDIATELY** - You won't see it again!

Format: `SG.xxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxx`

### 4.4 Set Up Webhooks (For Tracking)

1. Go to **Settings** → **Mail Send** → **Event Webhook**
2. Click **Add Endpoint**
3. Endpoint URL: `https://yourdomain.com/api/unsubscribe`
   - (Replace `yourdomain.com` with your actual domain)
   - **Local testing:** Use ngrok tunnel (see troubleshooting)
4. Select events:
   - ✅ Opened
   - ✅ Clicked
   - ✅ Bounced
   - ✅ Unsubscribe
   - ✅ Dropped
5. Click **Save**

---

## 🔐 STEP 5: Update Environment Variables (5 minutes)

Add these to `.env.local` in your project root:

```bash
# ===== SUPABASE DATABASE =====
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# ===== SENDGRID EMAIL SERVICE =====
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@siteTeFL.com

# ===== APP URL (for unsubscribe links) =====
NEXT_PUBLIC_APP_URL=https://yourdomain.com
# For local development, use:
# NEXT_PUBLIC_APP_URL=http://localhost:3003
```

**Important:** Restart your dev server after updating `.env.local`!

```bash
npm run dev
```

---

## ✅ STEP 6: Connect Database to API Routes (30 minutes)

Now replace the `TODO` comments in the API routes with actual database calls.

### 6.1 Update `/api/admin/contacts/route.ts`

Replace the GET function with:

```typescript
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");

  let query = supabase.from("contacts").select("*");
  
  if (type && type !== "all") {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }

  return NextResponse.json(data);
}
```

### 6.2 Update `/api/admin/contacts/route.ts` POST

```typescript
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { email, name, type, country, website, notes } = body;

    if (!email || !name || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("contacts")
      .insert([{ email, name, type, country, website, notes }])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data: data?.[0] });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### 6.3 Update `/api/admin/campaigns/route.ts`

```typescript
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("email_campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { name, subject, body: emailBody, templateId, recipientCount } = body;

    if (!name || !subject || !emailBody) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("email_campaigns")
      .insert([{
        name,
        subject,
        body: emailBody,
        template_id: templateId,
        status: "draft",
        created_by: userId,
        recipient_count: recipientCount || 0
      }])
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data: data?.[0] });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### 6.4 Similar updates needed for:
- `/api/admin/templates/route.ts`
- `/api/admin/stats/route.ts`
- `/api/admin/analytics/route.ts`

**Pattern:** Replace `TODO` with actual Supabase queries using the `supabase` client.

---

## 🧪 STEP 7: Test Everything (15 minutes)

### 7.1 Test Admin Panel

```bash
npm run dev
```

Then:
1. Go to http://localhost:3003/admin
2. Sign in with Clerk
3. Check Dashboard loads (should show 0 contacts/campaigns)
4. Go to **Contacts** → **Add Contact**
   - Email: `test@example.com`
   - Name: `Test School`
   - Type: `School`
   - Click **Create**
5. Refresh page → Contact should appear in list ✅

### 7.2 Test Email Sending

Go to `/api/admin/campaigns/:campaignId/send` OR create an endpoint test:

```bash
curl -X POST http://localhost:3003/api/email-campaigns/send \
  -H "Content-Type: application/json" \
  -d '{"campaignId":"YOUR_CAMPAIGN_ID"}'
```

You should see in logs:
```
✅ Sent to test@example.com
```

### 7.3 Test Unsubscribe

Visit: `http://localhost:3003/api/unsubscribe?contactId=test-id`

Should show confirmation page ✅

---

## 📋 Configuration Checklist

- [ ] Installed @sendgrid/mail and @supabase/supabase-js
- [ ] Created lib/supabase.ts client file
- [ ] Created Supabase project
- [ ] Ran schema.sql to create tables
- [ ] Copied Supabase URL & Service Role Key
- [ ] Created SendGrid account
- [ ] Verified sender email in SendGrid
- [ ] Created SendGrid API key
- [ ] Set up SendGrid webhook for /api/unsubscribe
- [ ] Updated .env.local with all 4 environment variables
- [ ] Restarted dev server (npm run dev)
- [ ] Tested admin panel loads
- [ ] Created test contact
- [ ] Contact appears in database
- [ ] Updated API routes with database queries
- [ ] Tested email sending
- [ ] Tested unsubscribe link

---

## 🎯 Your Complete Workflow (After Setup)

```
1. CREATE CONTACT
   Admin → Contacts → Add Contact
   ↓
2. CREATE TEMPLATE
   Admin → Templates → New Template
   ↓
3. CREATE CAMPAIGN
   Admin → Campaigns → New Campaign
   ↓
4. SELECT RECIPIENTS
   Choose contacts or segments
   ↓
5. SEND CAMPAIGN
   Click "Send Now" or Schedule
   ↓
6. TRACK RESULTS
   Admin → Analytics
   See opens, clicks, bounces
   ↓
7. HANDLE UNSUBSCRIBES
   Users click unsubscribe link
   Automatically marked in database
```

---

## 🐛 Troubleshooting

### "Database connection error"
- Check `.env.local` has correct SUPABASE_URL and SERVICE_ROLE_KEY
- Restart dev server: npm run dev
- Verify Supabase project status (Settings → Project Status)

### "SendGrid API key invalid"
- Verify API key is exactly as copied (no extra spaces)
- Check it's Service Role Key (starts with `SG.`)
- Generate new key if unsure

### "Webhooks not working locally"
- SendGrid can't reach localhost
- Use ngrok to expose localhost:
  ```bash
  npm install -g ngrok
  ngrok http 3003
  # Use the https URL in SendGrid webhook settings
  ```

### "Emails not sending"
- Check SendGrid sender email is verified
- Verify SENDGRID_API_KEY is in .env.local
- Check SendGrid activity log for errors
- Free tier: 100 emails/day limit

### "Admin panel shows 0 contacts after creating one"
- Hard refresh browser (Ctrl+F5)
- Check browser console (F12) for errors
- Verify contact was actually created in Supabase
- Check Supabase dashboard → contacts table

---

## 🔄 Database Query Examples

Once connected, here are useful patterns:

```typescript
// Get contacts by type
const { data } = await supabase
  .from("contacts")
  .select("*")
  .eq("type", "school");

// Get unsubscribed contacts
const { data } = await supabase
  .from("contacts")
  .select("*")
  .eq("unsubscribed", true);

// Get campaign with recipients
const { data } = await supabase
  .from("email_campaigns")
  .select("*, campaign_recipients(*)")
  .eq("id", campaignId)
  .single();

// Update contact
const { error } = await supabase
  .from("contacts")
  .update({ notes: "Updated notes" })
  .eq("id", contactId);
```

---

## ✨ What Works Now

✅ Sign in with Clerk  
✅ View admin dashboard  
✅ Add contacts to database  
✅ Create email campaigns  
✅ Send emails via SendGrid  
✅ Track opens, clicks, bounces  
✅ Handle unsubscribes  

---

## 📈 Next Advanced Features (Optional)

After everything works:

1. **CSV Import** - Bulk upload contacts
2. **Email Builder** - Drag-and-drop editor
3. **Scheduling** - Send at specific times
4. **Segmentation** - Target specific groups
5. **A/B Testing** - Test different versions
6. **Analytics Charts** - Visual dashboards
7. **Automation** - Triggered email flows

---

## 🎓 Learning Resources

- **Supabase Docs:** https://supabase.com/docs
- **SendGrid Docs:** https://docs.sendgrid.com/for-developers
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **TypeScript:** https://www.typescriptlang.org/docs

---

## 🎯 Success = You can:

✅ Go to `/admin` and see dashboard  
✅ Create a contact in admin panel  
✅ See contact in database  
✅ Create and send an email campaign  
✅ Receive test email  
✅ Click unsubscribe link  
✅ See contact marked as unsubscribed  

**When all 6 are working, you're done! 🎉**

---

**Ready to get started? Begin with STEP 1 above!**
