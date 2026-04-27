# Admin Panel: Bulk Email System
## Comprehensive Implementation Plan for siteTeFL

---

## 🎯 Overview

Build an admin dashboard that allows you to:
- **Reach out to schools/academies** - Promote siteTeFL and recruit them to post jobs
- **Contact teachers** - Schools reach out to registered teachers
- **Manage contacts** - Upload, segment, and organize email lists
- **Create campaigns** - Design, schedule, and send bulk emails
- **Track results** - Monitor opens, clicks, responses

---

## 🏗️ Architecture

### Technology Stack

```
Frontend:
  - React/Next.js (already using)
  - TypeScript
  - Tailwind CSS
  - React Data Grid (for contact management)

Backend:
  - Next.js API routes (already set up)
  - Clerk (authentication - already integrated)
  - PostgreSQL/MongoDB (email campaigns, contacts)
  - Bull Queue (for background job processing)
  - SendGrid or AWS SES (email delivery)

Infrastructure:
  - Vercel (deployment - already using)
  - PostgreSQL hosted (Supabase, Railway, or similar)
  - Email service provider (SendGrid recommended)
```

---

## 📊 Database Schema

### Three Main Tables

```sql
-- 1. Contacts (Schools & Teachers)
CREATE TABLE contacts (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  type ENUM('school', 'teacher', 'academy'), -- Contact type
  country VARCHAR(100),
  website VARCHAR(255),
  phone VARCHAR(20),
  notes TEXT,
  tags JSONB, -- ['esl-school', 'hiring', 'partner']
  source VARCHAR(100), -- 'uploaded', 'job-application', 'manual'
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- 2. Email Campaigns
CREATE TABLE email_campaigns (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  subject VARCHAR(255),
  body TEXT,
  html_body TEXT,
  template_id UUID, -- Reference to template
  status ENUM('draft', 'scheduled', 'sending', 'completed', 'paused'),
  scheduled_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  recipient_count INT,
  sent_count INT,
  opened_count INT,
  clicked_count INT,
  bounced_count INT,
  created_by UUID, -- Admin user ID
  created_at TIMESTAMP
);

-- 3. Campaign Recipients (Tracking)
CREATE TABLE campaign_recipients (
  id UUID PRIMARY KEY,
  campaign_id UUID REFERENCES email_campaigns(id),
  contact_id UUID REFERENCES contacts(id),
  status ENUM('pending', 'sent', 'opened', 'clicked', 'bounced', 'unsubscribed'),
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  last_click_at TIMESTAMP,
  bounced_at TIMESTAMP,
  response_notes TEXT
);

-- 4. Email Templates
CREATE TABLE email_templates (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  subject VARCHAR(255),
  body TEXT,
  html_body TEXT,
  variables JSONB, -- ['{{school_name}}', '{{teacher_count}}']
  created_by UUID,
  created_at TIMESTAMP
);

-- 5. Contact Segments (Groups)
CREATE TABLE contact_segments (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  filters JSONB, -- {country: 'Thailand', type: 'school'}
  contact_count INT,
  created_by UUID,
  created_at TIMESTAMP
);
```

---

## 🎨 Admin Panel Pages

### 1. Dashboard
- Overview stats (total contacts, campaigns sent, open rate)
- Recent campaigns performance
- Quick actions (New Campaign, Import Contacts)

### 2. Contacts Manager
- Table view of all contacts
- Filter by type, country, tags
- Import contacts via CSV
- Add/edit individual contacts
- Create segments/groups
- Export contacts
- Unsubscribe management

### 3. Email Templates
- Create/edit templates
- Drag-and-drop editor (or HTML)
- Variable system ({{school_name}}, {{job_count}})
- Preview template
- Save as draft or publish

### 4. Campaign Builder
- **Step 1: Select Template** - Choose email template
- **Step 2: Personalization** - Set variables
- **Step 3: Recipients** - Select contacts or segment
- **Step 4: Scheduling** - Choose send time
- **Step 5: Review** - Preview and send
- Real-time preview showing how it looks

### 5. Campaigns View
- List all campaigns (past and scheduled)
- Campaign status (Draft, Scheduled, Sending, Completed)
- Performance metrics (sent, opened, clicked, bounced)
- Campaign details and drill-down
- Edit/reschedule draft campaigns
- Pause/resume running campaigns

### 6. Analytics
- Campaign performance dashboard
- Email open rates over time
- Click-through rates
- Bounce rates and error tracking
- Contact engagement heat map
- Export reports

### 7. Settings
- API keys management (SendGrid, etc.)
- Sender email configuration
- Unsubscribe settings
- Bounce handling rules
- Admin user management

---

## 🔐 Security & Access Control

```typescript
// Role-based access control
ADMIN_ROLES = {
  'super_admin': ['all'],
  'campaign_manager': ['create_campaigns', 'view_analytics'],
  'contact_manager': ['manage_contacts', 'create_segments']
}

// Only admins can access
- /admin/* routes protected by Clerk
- Must have admin role in Clerk metadata
```

---

## 📧 Email Service Integration

### SendGrid (Recommended)

**Why SendGrid?**
- Free tier: 100 emails/day
- Paid: Affordable scaling
- Built-in bounce/unsubscribe handling
- Analytics and tracking
- Template editor
- Webhook support

**Integration:**
```typescript
// API endpoint to send campaign
POST /api/admin/campaigns/send
- Triggers background job
- Sends in batches (avoid rate limits)
- Tracks delivery status
- Updates database

// Webhook to track opens/clicks
POST /api/webhooks/sendgrid
- Updates campaign_recipients table
- Recalculates engagement metrics
```

---

## 🚀 Implementation Phases

### Phase 1: MVP (1-2 weeks)
- [x] Admin authentication (use existing Clerk)
- [x] Basic contacts table (add, edit, view)
- [x] Simple email template editor
- [x] CSV import for contacts
- [x] Single email campaign sender
- [ ] Basic metrics (sent, opened, bounced)
- [ ] SendGrid integration

### Phase 2: Enhanced (2-3 weeks)
- [ ] Email templates with drag-and-drop
- [ ] Contact segments/filtering
- [ ] Campaign scheduling
- [ ] Advanced analytics dashboard
- [ ] Unsubscribe management
- [ ] Bounce handling

### Phase 3: Advanced (3-4 weeks)
- [ ] Automation/workflows
- [ ] A/B testing
- [ ] Advanced personalization
- [ ] Multi-language support
- [ ] API for schools/teachers to access

---

## 📋 Feature Breakdown

### Minimal MVP (Week 1)
```
Admin Panel:
  ✓ Login (already have Clerk)
  ✓ Contacts table (CRUD)
  ✓ CSV import
  ✓ Email templates (simple text)
  ✓ Campaign creation (form)
  ✓ Send emails via SendGrid
  ✓ Basic tracking (sent/opened)
```

### Full MVP (Week 2)
```
Add:
  ✓ Contact segments
  ✓ HTML email editor
  ✓ Campaign scheduling
  ✓ Metrics dashboard
  ✓ Bounce handling
  ✓ Unsubscribe management
```

---

## 💾 Database Setup Options

### Option 1: Supabase (Recommended)
- PostgreSQL hosted
- Built-in auth (but use Clerk instead)
- Real-time subscriptions
- Storage for files
- $25/month for production

### Option 2: Railway
- PostgreSQL hosted
- Simple deployment
- $5-50/month depending on usage

### Option 3: Self-hosted
- Run PostgreSQL locally during development
- Deploy to AWS RDS later
- More control, more setup

---

## 🔌 Email Service Costs

### SendGrid
- **Free tier:** 100 emails/day (enough for testing)
- **Paid:** $20/month for 50,000/month sends
- **Enterprise:** Custom pricing for 100k+/month

### AWS SES
- **Free tier:** 62,000/month (within AWS free tier)
- **Paid:** $0.10 per 1,000 emails

### Mailgun
- **Free:** 5,000/month
- **Paid:** $35/month for unlimited

---

## 🛠️ Tech Decisions to Make

1. **Database:** Supabase, Railway, or self-hosted PostgreSQL?
2. **Email Service:** SendGrid, AWS SES, or Mailgun?
3. **Contact Storage:** Upload CSV or sync from external database?
4. **Analytics:** SendGrid built-in or custom tracking?
5. **Queue System:** Bull.js for async job processing?

---

## 📈 Quick Implementation Path

### Week 1 (MVP)
1. Set up PostgreSQL + Supabase
2. Create contacts table + admin panel UI
3. Build CSV import feature
4. Create simple email form
5. Integrate SendGrid
6. Send first test campaign

### Week 2 (Enhanced)
1. Add contact segments
2. Create email template system
3. Add campaign scheduling
4. Build analytics dashboard
5. Implement bounce handling

### Week 3+ (Polish)
1. Advanced features
2. Performance optimization
3. User testing
4. Deployment to production

---

## 🎯 Expected Timeline & Effort

- **Setup & Architecture:** 2-3 days
- **Database & Auth:** 2 days
- **Contact Management UI:** 3-4 days
- **Email Template Editor:** 3-4 days
- **Campaign Builder:** 2-3 days
- **SendGrid Integration:** 2 days
- **Analytics Dashboard:** 2-3 days
- **Testing & Polish:** 2-3 days

**Total MVP:** 1.5-2 weeks (working full-time)

---

## 🚀 Getting Started

**Next Steps:**
1. Decide on tech stack (database, email service)
2. Set up PostgreSQL database
3. Create admin authentication
4. Build contacts table UI
5. Implement CSV import
6. Connect SendGrid
7. Create first campaign flow

---

## 📞 Support Needed

Would you like me to:
1. Create the database schema and set it up?
2. Build the admin panel UI components?
3. Set up SendGrid integration?
4. Create the campaign builder flow?
5. All of the above (recommended)?

**Which interests you most?** 🎯

