#!/bin/bash

# Send test email via the API endpoint
echo "📧 Sending test email to blackflag786@hotmail.com..."
echo ""

# Make the API request
curl -X POST http://localhost:3003/api/email-campaigns/test-send \
  -H "Content-Type: application/json" \
  -d '{
    "recipientEmail": "blackflag786@hotmail.com",
    "recipientName": "Test User",
    "subject": "🎉 Test Email from siteTeFL Admin Panel"
  }' 2>/dev/null | jq '.' 2>/dev/null || \
  curl -X POST http://localhost:3003/api/email-campaigns/test-send \
    -H "Content-Type: application/json" \
    -d '{
      "recipientEmail": "blackflag786@hotmail.com",
      "recipientName": "Test User",
      "subject": "🎉 Test Email from siteTeFL Admin Panel"
    }'

echo ""
echo "✅ If you see a success message above, the email was sent!"
