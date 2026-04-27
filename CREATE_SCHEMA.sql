-- ============================================================================
-- ADMIN PANEL MODELS (Email Campaigns)
-- ============================================================================

-- Contacts table
CREATE TABLE IF NOT EXISTS "contacts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "country" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "notes" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "unsubscribed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Email templates table
CREATE TABLE IF NOT EXISTS "email_templates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT,
    "html_body" TEXT,
    "variables" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Email campaigns table
CREATE TABLE IF NOT EXISTS "email_campaigns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT,
    "html_body" TEXT,
    "template_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "sent_count" INTEGER NOT NULL DEFAULT 0,
    "opened_count" INTEGER NOT NULL DEFAULT 0,
    "clicked_count" INTEGER NOT NULL DEFAULT 0,
    "bounced_count" INTEGER NOT NULL DEFAULT 0,
    "recipient_count" INTEGER NOT NULL DEFAULT 0,
    "created_by" TEXT,
    "scheduled_at" TIMESTAMP(3),
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "email_campaigns_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "email_templates" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Campaign recipients table
CREATE TABLE IF NOT EXISTS "campaign_recipients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaign_id" TEXT NOT NULL,
    "contact_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "sent_at" TIMESTAMP(3),
    "opened_at" TIMESTAMP(3),
    "last_click_at" TIMESTAMP(3),
    "bounced_at" TIMESTAMP(3),
    "response_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "campaign_recipients_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "email_campaigns" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "campaign_recipients_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "campaign_recipients_campaign_id_contact_id_key" UNIQUE("campaign_id", "contact_id")
);

-- ============================================================================
-- SCHOOLBASE MODELS (School Discovery & Lead Generation)
-- ============================================================================

-- Locations table
CREATE TABLE IF NOT EXISTS "sb_locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "parent_id" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "geonames_id" TEXT UNIQUE,
    "wikidata_id" TEXT,
    "osm_id" TEXT,
    "school_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sb_locations_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "sb_locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Schools table
CREATE TABLE IF NOT EXISTS "sb_schools" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location_id" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "lead_score" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "osm_id" TEXT UNIQUE,
    "wikidata_id" TEXT,
    "search_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sb_schools_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "sb_locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- School sources table
CREATE TABLE IF NOT EXISTS "sb_sources" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "school_id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "url" TEXT,
    "method" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sb_sources_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "sb_schools" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- School verification table
CREATE TABLE IF NOT EXISTS "sb_verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "school_id" TEXT NOT NULL UNIQUE,
    "email_address" TEXT NOT NULL,
    "phone_number" TEXT,
    "website" TEXT,
    "email_status" TEXT NOT NULL DEFAULT 'pending',
    "phone_status" TEXT NOT NULL DEFAULT 'pending',
    "website_status" TEXT NOT NULL DEFAULT 'pending',
    "last_checked_at" TIMESTAMP(3),
    "verification_notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sb_verification_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "sb_schools" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- School campaigns table
CREATE TABLE IF NOT EXISTS "sb_campaigns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "emails_sent" INTEGER NOT NULL DEFAULT 0,
    "emails_opened" INTEGER NOT NULL DEFAULT 0,
    "emails_clicked" INTEGER NOT NULL DEFAULT 0,
    "emails_bounced" INTEGER NOT NULL DEFAULT 0,
    "scheduled_at" TIMESTAMP(3),
    "sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- School campaign recipients table
CREATE TABLE IF NOT EXISTS "sb_campaign_recipients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaign_id" TEXT NOT NULL,
    "school_id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "sent_at" TIMESTAMP(3),
    "opened_at" TIMESTAMP(3),
    "clicked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sb_campaign_recipients_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "sb_campaigns" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sb_campaign_recipients_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "sb_schools" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sb_campaign_recipients_campaign_id_school_id_key" UNIQUE("campaign_id", "school_id")
);

-- Search results table
CREATE TABLE IF NOT EXISTS "sb_search_results" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "country" TEXT NOT NULL,
    "region" TEXT,
    "city" TEXT NOT NULL,
    "school_type" TEXT,
    "search_params" TEXT,
    "results_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE IF NOT EXISTS "sb_settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "geonames_username" TEXT NOT NULL DEFAULT '',
    "enable_overpass_api" BOOLEAN NOT NULL DEFAULT true,
    "overpass_api_url" TEXT NOT NULL DEFAULT 'https://overpass-api.de/api/interpreter',
    "max_search_radius" INTEGER NOT NULL DEFAULT 50,
    "email_verification_service" TEXT NOT NULL DEFAULT 'smtp',
    "enable_web_scraping" BOOLEAN NOT NULL DEFAULT true,
    "scraping_rate_limit" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "verification_batch_size" INTEGER NOT NULL DEFAULT 50,
    "last_sync_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- CREATE INDEXES
-- ============================================================================

CREATE INDEX "contacts_email_idx" ON "contacts"("email");
CREATE INDEX "contacts_type_idx" ON "contacts"("type");
CREATE INDEX "contacts_country_idx" ON "contacts"("country");

CREATE INDEX "email_templates_name_idx" ON "email_templates"("name");

CREATE INDEX "email_campaigns_status_idx" ON "email_campaigns"("status");
CREATE INDEX "email_campaigns_template_id_idx" ON "email_campaigns"("template_id");

CREATE INDEX "campaign_recipients_campaign_id_idx" ON "campaign_recipients"("campaign_id");
CREATE INDEX "campaign_recipients_contact_id_idx" ON "campaign_recipients"("contact_id");
CREATE INDEX "campaign_recipients_status_idx" ON "campaign_recipients"("status");

CREATE INDEX "sb_locations_type_idx" ON "sb_locations"("type");
CREATE INDEX "sb_locations_parent_id_idx" ON "sb_locations"("parent_id");
CREATE INDEX "sb_locations_geonames_id_idx" ON "sb_locations"("geonames_id");

CREATE INDEX "sb_schools_email_idx" ON "sb_schools"("email");
CREATE INDEX "sb_schools_verified_idx" ON "sb_schools"("verified");
CREATE INDEX "sb_schools_lead_score_idx" ON "sb_schools"("lead_score");
CREATE INDEX "sb_schools_location_id_idx" ON "sb_schools"("location_id");
CREATE INDEX "sb_schools_osm_id_idx" ON "sb_schools"("osm_id");

CREATE INDEX "sb_sources_school_id_idx" ON "sb_sources"("school_id");
CREATE INDEX "sb_sources_source_idx" ON "sb_sources"("source");

CREATE INDEX "sb_verification_school_id_idx" ON "sb_verification"("school_id");
CREATE INDEX "sb_verification_email_status_idx" ON "sb_verification"("email_status");

CREATE INDEX "sb_campaigns_status_idx" ON "sb_campaigns"("status");

CREATE INDEX "sb_campaign_recipients_campaign_id_idx" ON "sb_campaign_recipients"("campaign_id");
CREATE INDEX "sb_campaign_recipients_school_id_idx" ON "sb_campaign_recipients"("school_id");
CREATE INDEX "sb_campaign_recipients_status_idx" ON "sb_campaign_recipients"("status");

CREATE INDEX "sb_search_results_country_idx" ON "sb_search_results"("country");
CREATE INDEX "sb_search_results_city_idx" ON "sb_search_results"("city");
