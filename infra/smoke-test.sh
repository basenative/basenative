#!/bin/bash
# Minimal Smoke Test for Greenput API
# Usage: ./smoke-test.sh <API_URL>

API_URL=$1

if [ -z "$API_URL" ]; then
  echo "Usage: $0 <API_URL>"
  exit 1
fi

echo "Testing Greenput API at $API_URL..."

# 1. Test POST /leads (Create Lead)
echo "1. Creating Lead..."
RESPONSE=$(curl -s -X POST "$API_URL/leads" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smoke Test User",
    "email": "smoke@example.com",
    "projectDetails": "Just a smoke test",
    "purposes": {
      "service_matching": "granted",
      "communication": "granted",
      "analytics": "denied"
    }
  }')

echo "Response: $RESPONSE"

if echo "$RESPONSE" | grep -q "receipt"; then
  echo "✅ Lead created successfully."
else
  echo "❌ Failed to create lead."
  exit 1
fi

# Extract Receipt ID (requires jq, fallback to simple grep/sed if not available)
# Assuming simple JSON structure for smoke test
RECEIPT_ID=$(echo "$RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$RECEIPT_ID" ]; then
  echo "⚠️  Could not extract Receipt ID (install jq for better parsing). Skipping retrieval test."
else
  echo "Receipt ID: $RECEIPT_ID"

  # 2. Test GET /receipts/:id
  echo "2. Retrieving Receipt..."
  GET_RESPONSE=$(curl -s "$API_URL/receipts/$RECEIPT_ID")
  echo "Response: $GET_RESPONSE"
  
  if echo "$GET_RESPONSE" | grep -q "$RECEIPT_ID"; then
     echo "✅ Receipt retrieved successfully."
  else
     echo "❌ Failed to retrieve receipt."
     exit 1
  fi
  
  # 3. Test POST /revoke
  echo "3. Revoking Consent..."
  REVOKE_RESPONSE=$(curl -s -X POST "$API_URL/revoke" \
    -H "Content-Type: application/json" \
    -d "{ \"receiptId\": \"$RECEIPT_ID\" }")
    
  echo "Response: $REVOKE_RESPONSE"
  
  if echo "$REVOKE_RESPONSE" | grep -q "Revocation recorded"; then
    echo "✅ Consent revoked successfully."
  else
    echo "❌ Failed to revoke consent."
  fi
fi

echo "Smoke test complete."
