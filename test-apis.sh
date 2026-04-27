#!/bin/bash

# API Testing Script - Test Government Job APIs
# This script tests each government job API endpoint
# Run with: bash test-apis.sh

echo "=========================================="
echo "TESTING GOVERNMENT JOB APIS"
echo "=========================================="
echo ""

# Load .env variables (optional - adjust path as needed)
if [ -f .env.local ]; then
    set -a
    source .env.local
    set +a
fi

# ============ EURES (EU-wide - PUBLIC API, NO CREDENTIALS NEEDED) ============
echo "1️⃣  TESTING EURES (EU-wide - PUBLIC)"
echo "---"
curl -s -k "https://pam-eures-stilling-eksport.nais.oera.no/input/api/jv/v0.1/getAll" \
  -H "Accept: application/json" | jq '.' | head -50
echo ""
echo "✓ EURES test complete"
echo ""

# ============ USAJOBS ============
echo "2️⃣  TESTING USAJOBS (USA)"
echo "---"
echo "Note: Requires USAJOBS_API_KEY and USAJOBS_USER_AGENT"
if [ -z "$USAJOBS_API_KEY" ] || [ "$USAJOBS_API_KEY" = "your_api_key_here" ]; then
    echo "❌ USAJOBS_API_KEY not configured"
    echo "Register at: https://developer.usajobs.gov/"
else
    curl -s "https://data.usajobs.gov/api/search?Keyword=english%20teacher&ResultsPerPage=10" \
      -H "Host: data.usajobs.gov" \
      -H "User-Agent: ${USAJOBS_USER_AGENT:-your_email@example.com}" \
      -H "Authorization-Key: $USAJOBS_API_KEY" | jq '.' | head -50
fi
echo ""

# ============ BUNDESAGENTUR für ARBEIT (Germany) ============
echo "3️⃣  TESTING BUNDESAGENTUR für ARBEIT (Germany)"
echo "---"
echo "Note: Requires ARBEITSAGENTUR_API_KEY"
if [ -z "$ARBEITSAGENTUR_API_KEY" ] || [ "$ARBEITSAGENTUR_API_KEY" = "your_api_key_here" ]; then
    echo "❌ ARBEITSAGENTUR_API_KEY not configured"
    echo "Register at: https://github.com/bundesAPI/jobsuche-api"
else
    curl -s "https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v4/jobs?stellenmarkt=jobs&paginationIndex=0&size=10" \
      -H "X-API-Key: $ARBEITSAGENTUR_API_KEY" \
      -H "Accept: application/json" | jq '.' | head -50
fi
echo ""

# ============ FRANCE TRAVAIL ============
echo "4️⃣  TESTING FRANCE TRAVAIL (France)"
echo "---"
echo "Note: Requires FRANCE_TRAVAIL_CLIENT_ID and FRANCE_TRAVAIL_CLIENT_SECRET"
if [ -z "$FRANCE_TRAVAIL_CLIENT_ID" ] || [ "$FRANCE_TRAVAIL_CLIENT_ID" = "your_client_id_here" ]; then
    echo "❌ FRANCE_TRAVAIL credentials not configured"
    echo "Register at: https://francetravail.io/"
else
    echo "Getting OAuth2 token..."
    TOKEN=$(curl -s -X POST \
      -H "Content-Type: application/x-www-form-urlencoded" \
      -d "grant_type=client_credentials&client_id=${FRANCE_TRAVAIL_CLIENT_ID}&client_secret=${FRANCE_TRAVAIL_CLIENT_SECRET}" \
      "${FRANCE_TRAVAIL_TOKEN_URL}" | jq -r '.access_token')

    if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
        echo "✓ Token obtained"
        curl -s "https://api.francetravail.io/api/offers/v1/search?keywords=english%20teacher&range=0-10" \
          -H "Authorization: Bearer $TOKEN" \
          -H "Accept: application/json" | jq '.' | head -50
    else
        echo "❌ Failed to obtain OAuth2 token"
    fi
fi
echo ""

# ============ MYCAREERSFUTURE (Singapore) ============
echo "5️⃣  TESTING MYCAREERSFUTURE (Singapore)"
echo "---"
echo "Note: Requires MYCAREERSFUTURE_API_KEY"
if [ -z "$MYCAREERSFUTURE_API_KEY" ] || [ "$MYCAREERSFUTURE_API_KEY" = "your_api_key_here" ]; then
    echo "❌ MYCAREERSFUTURE_API_KEY not configured"
    echo "Contact: contact@mycareersfuture.gov.sg or call 6883 5885"
else
    curl -s "https://api.mycareersfuture.gov.sg/api/jobs/search?keywords=english%20teacher&limit=10" \
      -H "Authorization: Bearer $MYCAREERSFUTURE_API_KEY" \
      -H "Accept: application/json" | jq '.' | head -50
fi
echo ""

# ============ WORKNET (South Korea) ============
echo "6️⃣  TESTING WORKNET (South Korea)"
echo "---"
echo "Note: Requires WORKNET_API_KEY"
if [ -z "$WORKNET_API_KEY" ] || [ "$WORKNET_API_KEY" = "your_api_key_here" ]; then
    echo "❌ WORKNET_API_KEY not configured"
    echo "Contact: https://www.work.go.kr/"
else
    curl -s "https://api.work.go.kr/api/jobs/search?keyword=english&limit=10" \
      -H "Authorization: $WORKNET_API_KEY" \
      -H "Accept: application/json" | jq '.' | head -50
fi
echo ""

# ============ NCS (India) ============
echo "7️⃣  TESTING NCS (National Career Service - India)"
echo "---"
echo "Note: Requires NCS_API_KEY"
if [ -z "$NCS_API_KEY" ] || [ "$NCS_API_KEY" = "your_api_key_here" ]; then
    echo "❌ NCS_API_KEY not configured"
    echo "Contact: https://ncs.gov.in/"
else
    curl -s "https://api.ncs.gov.in/jobs/search?keyword=english&limit=10" \
      -H "Authorization: Bearer $NCS_API_KEY" \
      -H "Accept: application/json" | jq '.' | head -50
fi
echo ""

# ============ LIGHTCAST CANADA ============
echo "8️⃣  TESTING LIGHTCAST CANADA (Canada)"
echo "---"
echo "Note: Requires LIGHTCAST_API_KEY (Paid service)"
if [ -z "$LIGHTCAST_API_KEY" ] || [ "$LIGHTCAST_API_KEY" = "your_api_key_here" ]; then
    echo "❌ LIGHTCAST_API_KEY not configured"
    echo "Register at: https://lightcast.io/ (Paid service)"
else
    curl -s "https://api.lightcast.dev/v1/jobs?query=english%20teacher&limit=10" \
      -H "Authorization: Bearer $LIGHTCAST_API_KEY" \
      -H "Accept: application/json" | jq '.' | head -50
fi
echo ""

# ============ WORKFORCE AUSTRALIA ============
echo "9️⃣  TESTING WORKFORCE AUSTRALIA"
echo "---"
echo "Note: Requires WORKFORCE_AU_API_KEY"
if [ -z "$WORKFORCE_AU_API_KEY" ] || [ "$WORKFORCE_AU_API_KEY" = "your_api_key_here" ]; then
    echo "❌ WORKFORCE_AU_API_KEY not configured"
    echo "Contact: https://www.workforceaustralia.gov.au/"
else
    curl -s "https://www.workforceaustralia.gov.au/api/jobs/search?keyword=english%20teacher&limit=10" \
      -H "Authorization: Bearer $WORKFORCE_AU_API_KEY" \
      -H "Accept: application/json" | jq '.' | head -50
fi
echo ""

# ============ CAREERS NEW ZEALAND ============
echo "🔟 TESTING CAREERS NEW ZEALAND"
echo "---"
echo "Note: Requires CAREERS_NZ_API_KEY"
if [ -z "$CAREERS_NZ_API_KEY" ] || [ "$CAREERS_NZ_API_KEY" = "your_api_key_here" ]; then
    echo "❌ CAREERS_NZ_API_KEY not configured"
    echo "Contact: https://www.careers.govt.nz/"
else
    curl -s "https://api.careers.govt.nz/api/jobs?keyword=english&limit=10" \
      -H "Authorization: Bearer $CAREERS_NZ_API_KEY" \
      -H "Accept: application/json" | jq '.' | head -50
fi
echo ""

# ============ ARBETSFÖRMEDLINGEN (Sweden) ============
echo "1️⃣1️⃣  TESTING ARBETSFÖRMEDLINGEN (Sweden)"
echo "---"
echo "Note: Requires ARBETSFORMEDLINGEN_API_KEY"
if [ -z "$ARBETSFORMEDLINGEN_API_KEY" ] || [ "$ARBETSFORMEDLINGEN_API_KEY" = "your_api_key_here" ]; then
    echo "❌ ARBETSFORMEDLINGEN_API_KEY not configured"
    echo "Contact: developer@arbetsformedlingen.se"
else
    curl -s "https://api.arbetsformedlingen.se/jobs/search?keyword=english%20teacher&limit=10" \
      -H "Authorization: Bearer $ARBETSFORMEDLINGEN_API_KEY" \
      -H "Accept: application/json" | jq '.' | head -50
fi
echo ""

echo "=========================================="
echo "Testing complete!"
echo "=========================================="
