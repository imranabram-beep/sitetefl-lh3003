-- Admin Panel Database Schema for siteTeFL
-- Created for Supabase PostgreSQL

-- 1. Contacts Table (Schools, Academies, Teachers)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'school', 'academy', 'teacher'
  country VARCHAR(100),
  website VARCHAR(255),
  phone VARCHAR(20),
  notes TEXT,
  tags JSONB DEFAULT '[]'::jsonb, -- ['esl-school', 'hiring', 'partner']
  source VARCHAR(100), -- 'uploaded', 'job-application', 'manual'
  unsubscribed BOOLEAN DEFAULT FALSE,
  unsubscribed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Email Templates Table
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  html_body TEXT,
  variables JSONB DEFAULT '[]'::jsonb, -- ['{{school_name}}', '{{teacher_count}}']
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Email Campaigns Table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  html_body TEXT,
  template_id UUID REFERENCES email_templates(id),
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'completed', 'paused'
  scheduled_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  recipient_count INT DEFAULT 0,
  sent_count INT DEFAULT 0,
  opened_count INT DEFAULT 0,
  clicked_count INT DEFAULT 0,
  bounced_count INT DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. Campaign Recipients Table (Tracking)
CREATE TABLE IF NOT EXISTS campaign_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES email_campaigns(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'sent', 'opened', 'clicked', 'bounced', 'unsubscribed'
  sent_at TIMESTAMP,
  opened_at TIMESTAMP,
  last_click_at TIMESTAMP,
  bounced_at TIMESTAMP,
  response_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Contact Segments Table
CREATE TABLE IF NOT EXISTS contact_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  filters JSONB NOT NULL, -- {country: 'Thailand', type: 'school'}
  contact_count INT DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_type ON contacts(type);
CREATE INDEX idx_contacts_country ON contacts(country);
CREATE INDEX idx_campaigns_status ON email_campaigns(status);
CREATE INDEX idx_campaigns_created_by ON email_campaigns(created_by);
CREATE INDEX idx_campaign_recipients_campaign_id ON campaign_recipients(campaign_id);
CREATE INDEX idx_campaign_recipients_contact_id ON campaign_recipients(contact_id);
CREATE INDEX idx_campaign_recipients_status ON campaign_recipients(status);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_segments ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Admin only - adjust based on Clerk user ID)
CREATE POLICY "Admin access to contacts" ON contacts
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin access to email_templates" ON email_templates
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin access to email_campaigns" ON email_campaigns
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin access to campaign_recipients" ON campaign_recipients
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin access to contact_segments" ON contact_segments
  FOR ALL USING (auth.uid() IS NOT NULL);
