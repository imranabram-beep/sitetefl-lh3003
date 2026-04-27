#!/bin/bash

# Extract DATABASE_URL from .env.local and run migration
export DATABASE_URL="postgresql://postgres.dncafcfsyutrwcniyebw:MariyamAsiyaImranPatel@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"

# Run prisma db push (creates tables without migrations)
npx prisma db push --skip-generate
