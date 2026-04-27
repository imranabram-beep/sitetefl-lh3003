#!/usr/bin/env node

/**
 * Check email configuration for siteTeFL Admin
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 siteTeFL Email Configuration Check\n');

// Read .env.local
const envPath = path.join(__dirname, '.env.local');
let envContent = '';

try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
  console.error('❌ Could not read .env.local');
  process.exit(1);
}

// Parse environment variables
const lines = envContent.split('\n');
const config = {};

lines.forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    if (key.includes('SENDGRID') || key.includes('SUPABASE')) {
      config[key] = value;
    }
  }
});

// Check SendGrid
console.log('📧 SendGrid Configuration:');
const sgKey = config.SENDGRID_API_KEY;
const sgEmail = config.SENDGRID_FROM_EMAIL;

if (sgKey) {
  const keyPreview = sgKey.substring(0, 10) + '...' + sgKey.substring(sgKey.length - 10);
  console.log(`✅ API Key: ${keyPreview}`);
} else {
  console.log('❌ API Key: NOT SET');
}

if (sgEmail) {
  console.log(`✅ From Email: ${sgEmail}`);
} else {
  console.log('❌ From Email: NOT SET (using default: noreply@teflinasia.org)');
}

// Check Supabase
console.log('\n📊 Supabase Configuration:');
const sbUrl = config.NEXT_PUBLIC_SUPABASE_URL;
const sbKey = config.SUPABASE_SERVICE_ROLE_KEY;

if (sbUrl) {
  console.log(`✅ URL: ${sbUrl}`);
} else {
  console.log('❌ URL: NOT SET');
}

if (sbKey) {
  const keyPreview = sbKey.substring(0, 20) + '...' + sbKey.substring(sbKey.length - 10);
  console.log(`✅ Service Key: ${keyPreview}`);
} else {
  console.log('❌ Service Key: NOT SET');
}

// Recommendations
console.log('\n🎯 Email Testing Instructions:');
console.log('\n1. Make sure your Next.js server is running:');
console.log('   npm run dev\n');
console.log('2. Wait for it to compile, then test:');
console.log('   curl -X POST http://localhost:3003/api/email-campaigns/test-send \\');
console.log('     -H "Content-Type: application/json" \\');
console.log('     -d \'{"recipientEmail":"blackflag786@hotmail.com"}\'');
console.log('\n3. If it fails with "Bad Request":');
console.log('   - Check SendGrid API key is correct');
console.log('   - Verify noreply@teflinasia.org is verified in SendGrid');
console.log('   - Check server console for detailed error');
console.log('\n4. Check server logs for error details:');
console.log('   Look at the "npm run dev" console output');

console.log('\n✨ Configuration check complete!\n');
