# Greenput Infrastructure

This directory contains Terraform configuration to provision the Greenput environment on Cloudflare.

## Prerequisites

1. [Terraform](https://developer.hashicorp.com/terraform/install) installed.
2. Cloudflare Account.
3. API Token with permissions:
   - Workers Scripts: Edit
   - Pages: Edit
   - D1: Edit
   - Account Settings: Read

## Deployment

The infrastructure depends on built artifacts.

1. **Build the API**:
   ```bash
   nx build greenput-api
   ```
2. **Build the Frontend**:
   ```bash
   nx build showcase
   ```
3. **Init Terraform**:
   ```bash
   npm run infra:init
   ```
4. **Apply Terraform**:
   ```bash
   npm run infra:apply
   ```

## Setup (First Time)

1. Create a `terraform.tfvars` file (DO NOT COMMIT):

   ```hcl
   cloudflare_api_token = "your_token"
   account_id           = "your_account_id"
   ```

## Database Initialization

After creating the D1 database, you must initialize the schema manually using wrangler (until migration system is added):

```bash
npx wrangler d1 execute greenput-prod-db --command "CREATE TABLE IF NOT EXISTS receipts (id TEXT PRIMARY KEY, json TEXT, status TEXT);"
npx wrangler d1 execute greenput-prod-db --command "CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, receipt_id TEXT, data TEXT);"
npx wrangler d1 execute greenput-prod-db --command "CREATE TABLE IF NOT EXISTS revocations (id TEXT PRIMARY KEY, receipt_id TEXT, reason TEXT, timestamp TEXT);"
```
