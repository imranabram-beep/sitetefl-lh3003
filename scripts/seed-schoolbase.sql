-- Seed data for SchoolBase testing
-- Run this script in Supabase SQL editor to populate test data

-- Clear existing data (optional - comment out if you want to keep existing)
-- TRUNCATE sb_schools, sb_campaigns, sb_campaign_recipients, sb_verification CASCADE;

-- Insert test schools
INSERT INTO sb_schools (name, type, email, phone, website, verified, lead_score, created_at)
VALUES
  ('Bangkok International School', 'school', 'admissions@bkk.ac.th', '+66-2-963-5800', 'https://www.bkk.ac.th', true, 92, NOW()),
  ('Harrow International School Bangkok', 'academy', 'info@harrowbangkok.ac.th', '+66-2-300-5000', 'https://harrowbangkok.ac.th', true, 88, NOW()),
  ('Chiang Mai International School', 'school', 'office@cmis.ac.th', '+66-53-210-009', 'https://www.cmis.ac.th', true, 85, NOW()),
  ('Phuket International School', 'school', 'admin@phuketis.ac.th', '+66-76-340-300', 'https://www.phuketis.ac.th', true, 82, NOW()),
  ('NIST International School', 'academy', 'admissions@nist.ac.th', '+66-2-949-5000', 'https://www.nist.ac.th', true, 90, NOW()),
  ('Bangkok Prep International School', 'school', 'info@bangkokprep.ac.th', '+66-2-318-8444', 'https://www.bangkokprep.ac.th', true, 87, NOW()),
  ('Samut Prakan International School', 'school', 'office@samutprakan.ac.th', '+66-2-700-0012', 'https://www.samutprakan.ac.th', true, 80, NOW()),
  ('Assumption University Bangkok', 'university', 'admission@au.edu', '+66-2-719-8800', 'https://www.au.edu', true, 85, NOW()),
  ('Chulalongkorn University', 'university', 'admissions@chula.ac.th', '+66-2-218-2999', 'https://www.chula.ac.th', true, 95, NOW()),
  ('Thammasat University', 'university', 'admission@tu.ac.th', '+66-2-986-9999', 'https://www.tu.ac.th', true, 93, NOW()),
  ('Bangkok Christian College', 'school', 'admissions@bcc.ac.th', '+66-2-954-8000', 'https://www.bcc.ac.th', true, 84, NOW()),
  ('Debsirin School', 'school', 'info@debsirin.ac.th', '+66-2-279-4000', 'https://www.debsirin.ac.th', true, 81, NOW()),
  ('Triam Udom Suksa School', 'school', 'office@triamudom.ac.th', '+66-2-671-2000', 'https://www.triamudom.ac.th', true, 86, NOW()),
  ('Saint Gabriel\'s College', 'school', 'admin@sgc.ac.th', '+66-2-279-3377', 'https://www.sgc.ac.th', true, 83, NOW()),
  ('Satriwithaya School', 'academy', 'info@satriwithaya.ac.th', '+66-2-215-3020', 'https://www.satriwithaya.ac.th', true, 79, NOW()),
  ('Mahidol University', 'university', 'admission@mahidol.ac.th', '+66-2-418-0000', 'https://www.mahidol.ac.th', true, 94, NOW()),
  ('King Mongkut\'s University', 'university', 'info@kmitl.ac.th', '+66-2-329-8000', 'https://www.kmitl.ac.th', true, 89, NOW()),
  ('Siam University', 'university', 'admission@siam.edu', '+66-2-919-9999', 'https://www.siam.edu', true, 78, NOW()),
  ('Rangsit University', 'university', 'admission@rsu.ac.th', '+66-2-997-2222', 'https://www.rsu.ac.th', false, 75, NOW()),
  ('Kasetsart University', 'university', 'admission@ku.ac.th', '+66-2-942-8000', 'https://www.ku.ac.th', true, 91, NOW());

-- Insert test campaign (optional - for testing the send feature)
INSERT INTO sb_campaigns (name, subject, body, status, created_at)
VALUES
  (
    'Q2 2026 Thailand Schools Outreach',
    'TEFL Opportunities - English Teaching Positions Available',
    'Dear {{school_name}},

We are reaching out to introduce exciting English teaching opportunities available in Thailand for the 2026 academic year.

Our organization connects qualified TEFL-certified educators with premium schools throughout Thailand seeking experienced English teachers.

Key Benefits:
- Competitive salary packages
- Housing assistance
- Professional development support
- Work visa sponsorship
- International school environment

If your institution is interested in recruiting experienced English teachers, we would be delighted to discuss how we can support your hiring needs.

Best regards,
SchoolBase Team
admin@schoolbase.local',
    'draft',
    NOW()
  );

-- Insert sample campaign recipients for the test campaign
-- Note: You\'ll need to update the campaign_id if the campaign gets a different ID
INSERT INTO sb_campaign_recipients (campaign_id, school_id, status, created_at)
SELECT c.id, s.id, 'pending', NOW()
FROM sb_campaigns c, sb_schools s
WHERE c.name = 'Q2 2026 Thailand Schools Outreach'
  AND s.verified = true
  AND s.type IN ('school', 'academy')
LIMIT 10;

-- Insert test verification entries
INSERT INTO sb_verification (school_id, status, verification_type, verified_date)
SELECT id, 'verified', 'email', NOW()
FROM sb_schools
WHERE verified = true
LIMIT 15;

-- Insert settings
INSERT INTO sb_settings (
  geonames_username,
  enable_overpass_api,
  overpass_api_url,
  max_search_radius,
  email_verification_service,
  enable_web_scraping,
  scraping_rate_limit,
  verification_batch_size
)
VALUES
  (
    '',
    true,
    'https://overpass-api.de/api/interpreter',
    50,
    'smtp',
    true,
    0.5,
    50
  );

-- Verify data was inserted
SELECT 'Schools inserted:' as info, COUNT(*) as count FROM sb_schools
UNION ALL
SELECT 'Campaigns inserted:', COUNT(*) FROM sb_campaigns
UNION ALL
SELECT 'Recipients inserted:', COUNT(*) FROM sb_campaign_recipients
UNION ALL
SELECT 'Verifications inserted:', COUNT(*) FROM sb_verification;
