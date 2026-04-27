-- Insert test schools with generated IDs
INSERT INTO sb_schools (id, name, type, email, phone, website, verified, lead_score, created_at, updated_at)
VALUES
  (gen_random_uuid()::text, 'Bangkok International School', 'school', 'admissions@bkk.ac.th', '+66-2-963-5800', 'https://www.bkk.ac.th', true, 92, NOW(), NOW()),
  (gen_random_uuid()::text, 'Harrow International School Bangkok', 'academy', 'info@harrowbangkok.ac.th', '+66-2-300-5000', 'https://harrowbangkok.ac.th', true, 88, NOW(), NOW()),
  (gen_random_uuid()::text, 'Chiang Mai International School', 'school', 'office@cmis.ac.th', '+66-53-210-009', 'https://www.cmis.ac.th', true, 85, NOW(), NOW()),
  (gen_random_uuid()::text, 'Phuket International School', 'school', 'admin@phuketis.ac.th', '+66-76-340-300', 'https://www.phuketis.ac.th', true, 82, NOW(), NOW()),
  (gen_random_uuid()::text, 'NIST International School', 'academy', 'admissions@nist.ac.th', '+66-2-949-5000', 'https://www.nist.ac.th', true, 90, NOW(), NOW()),
  (gen_random_uuid()::text, 'Bangkok Prep International School', 'school', 'info@bangkokprep.ac.th', '+66-2-318-8444', 'https://www.bangkokprep.ac.th', true, 87, NOW(), NOW()),
  (gen_random_uuid()::text, 'Samut Prakan International School', 'school', 'office@samutprakan.ac.th', '+66-2-700-0012', 'https://www.samutprakan.ac.th', true, 80, NOW(), NOW()),
  (gen_random_uuid()::text, 'Assumption University Bangkok', 'university', 'admission@au.edu', '+66-2-719-8800', 'https://www.au.edu', true, 85, NOW(), NOW()),
  (gen_random_uuid()::text, 'Chulalongkorn University', 'university', 'admissions@chula.ac.th', '+66-2-218-2999', 'https://www.chula.ac.th', true, 95, NOW(), NOW()),
  (gen_random_uuid()::text, 'Thammasat University', 'university', 'admission@tu.ac.th', '+66-2-986-9999', 'https://www.tu.ac.th', true, 93, NOW(), NOW()),
  (gen_random_uuid()::text, 'Bangkok Christian College', 'school', 'admissions@bcc.ac.th', '+66-2-954-8000', 'https://www.bcc.ac.th', true, 84, NOW(), NOW()),
  (gen_random_uuid()::text, 'Debsirin School', 'school', 'info@debsirin.ac.th', '+66-2-279-4000', 'https://www.debsirin.ac.th', true, 81, NOW(), NOW()),
  (gen_random_uuid()::text, 'Triam Udom Suksa School', 'school', 'office@triamudom.ac.th', '+66-2-671-2000', 'https://www.triamudom.ac.th', true, 86, NOW(), NOW()),
  (gen_random_uuid()::text, 'Saint Gabriel College', 'school', 'admin@sgc.ac.th', '+66-2-279-3377', 'https://www.sgc.ac.th', true, 83, NOW(), NOW()),
  (gen_random_uuid()::text, 'Satriwithaya School', 'academy', 'info@satriwithaya.ac.th', '+66-2-215-3020', 'https://www.satriwithaya.ac.th', true, 79, NOW(), NOW()),
  (gen_random_uuid()::text, 'Mahidol University', 'university', 'admission@mahidol.ac.th', '+66-2-418-0000', 'https://www.mahidol.ac.th', true, 94, NOW(), NOW()),
  (gen_random_uuid()::text, 'King Mongkut University', 'university', 'info@kmitl.ac.th', '+66-2-329-8000', 'https://www.kmitl.ac.th', true, 89, NOW(), NOW()),
  (gen_random_uuid()::text, 'Siam University', 'university', 'admission@siam.edu', '+66-2-919-9999', 'https://www.siam.edu', true, 78, NOW(), NOW()),
  (gen_random_uuid()::text, 'Rangsit University', 'university', 'admission@rsu.ac.th', '+66-2-997-2222', 'https://www.rsu.ac.th', false, 75, NOW(), NOW()),
  (gen_random_uuid()::text, 'Kasetsart University', 'university', 'admission@ku.ac.th', '+66-2-942-8000', 'https://www.ku.ac.th', true, 91, NOW(), NOW());

-- Verify schools were inserted
SELECT 'Schools inserted:' as info, COUNT(*) as count FROM sb_schools;
