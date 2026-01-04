
terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

variable "cloudflare_api_token" {
  description = "Cloudflare API Token"
  type        = string
  sensitive   = true
}

variable "account_id" {
  description = "Cloudflare Account ID"
  type        = string
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# 1. Cloudflare Pages (Showcase)
resource "cloudflare_pages_project" "showcase" {
  account_id        = var.account_id
  name              = "greenput-showcase"
  production_branch = "main"

  build_config {
    build_command   = "nx build showcase"
    destination_dir = "dist/apps/showcase"
    root_dir        = "/"
  }

  deployment_configs {
    production {
      environment_variables = {
        GREENPUT_API_URL = "https://greenput-api.greenput.workers.dev" # Check output for real URL
      }
    }
    preview {
      environment_variables = {
        GREENPUT_API_URL = "https://greenput-api.greenput.workers.dev"
      }
    }
  }
}

# 2. D1 Database
resource "cloudflare_d1_database" "greenput_db" {
  account_id = var.account_id
  name       = "greenput-prod-db"
}

# Schema Init (Note: D1 Schema usually managed by migration tool, but we can't easily run it here. 
# We'll assume manual init or future migration script. 
# Terraform doesn't natively apply SQL content to D1 yet without external provider or complex hacks.)

# 3. Cloudflare Worker (Greenput API)
resource "cloudflare_worker_script" "greenput_api" {
  account_id = var.account_id
  name       = "greenput-api"
  content    = file("${path.module}/../dist/apps/greenput-api/index.js")
  module     = true

  # Bind D1
  d1_database_binding {
    name        = "DB"
    database_id = cloudflare_d1_database.greenput_db.id
  }
}

resource "cloudflare_worker_domain" "greenput_api_domain" {
  account_id = var.account_id
  service    = cloudflare_worker_script.greenput_api.name
  hostname   = "api.greenput.dev" # Example, requires zone. Removing for safety if zone unknown.
  # Skipping custom domain for now, using workers.dev
  zone_id    = "" # Need zone_id variable if using custom domain
  count      = 0 # Disabled by default
}

# Outputs
output "pages_url" {
  value = cloudflare_pages_project.showcase.subdomain
}

output "worker_name" {
  value = cloudflare_worker_script.greenput_api.name
}

output "d1_database_id" {
  value = cloudflare_d1_database.greenput_db.id
}
