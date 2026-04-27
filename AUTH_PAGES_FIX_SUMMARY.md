# Sign-In & Sign-Up Pages - Investigation & Fixes

## 📍 Link Locations Found

### `/sign-in` Link Locations:
1. **Navigation Bar** (`/src/components/nav-auth-buttons.tsx`)
   - Top-right corner, visible only for non-authenticated users
   - Text: "Log in"
   - Shows alongside "Enrol now" button

2. **Homepage Bottom CTA** (same component)
   - Part of the responsive navigation authentication system

### `/sign-up` Link Locations:
1. **Homepage Bottom CTA** (`/src/app/page.tsx`, line 357-359)
   - Bottom call-to-action section
   - Text: "Create free account"
   - Located in the `<section className="hp-cta-strip">`

2. **Navigation Bar** (`/src/components/nav-auth-buttons.tsx`)
   - Secondary auth navigation option

---

## 🔧 Issues Found & Fixed

### Issue #1: Invalid Set-Cookie Header Configuration
**File:** `/src/next.config.ts`
**Problem:** The Set-Cookie header was configured in the `headers()` function, which is not valid syntax. Set-Cookie headers cannot be set this way in Next.js - they must be set by the server during response, not in the config.

**Fix Applied:**
- ❌ Removed: `{ key: "Set-Cookie", value: "SameSite=None; Secure; Partitioned" }`
- This was causing the Chrome crash (Error code: 5)

### Issue #2: Missing Sign-Up Layout
**File:** `/src/app/sign-up/layout.tsx`
**Problem:** The sign-up folder was missing the layout wrapper that handles Clerk's loading/loaded states.

**Fix Applied:**
- ✅ Created: `/src/app/sign-up/layout.tsx` (matching `/src/app/sign-in/layout.tsx`)
- Wraps children with `<ClerkLoading>` and `<ClerkLoaded>` components
- Shows "Loading authentication..." during Clerk initialization

---

## ✅ Configuration Status

### Environment Variables ✓
All Clerk environment variables are properly configured in `.env.local`:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - ✓ Present
- `CLERK_SECRET_KEY` - ✓ Present
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` - ✓ Correct
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up` - ✓ Correct
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard` - ✓ Correct
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard` - ✓ Correct

### Component Structure ✓
- `/src/app/sign-in/layout.tsx` - ✓ Present and correct
- `/src/app/sign-in/[[...sign-in]]/page.tsx` - ✓ Properly renders `<SignIn />` component
- `/src/app/sign-up/layout.tsx` - ✓ **NOW PRESENT** (just created)
- `/src/app/sign-up/[[...sign-up]]/page.tsx` - ✓ Properly renders `<SignUp />` component

### Clerk Configuration in Root Layout ✓
- `/src/app/layout.tsx` - ClerkProvider properly wraps entire app with correct URLs configured

### Middleware ✓
- `/src/middleware.ts` - Clerk middleware properly configured to protect `/dashboard` routes

### Styling ✓
- `/src/app/auth.css` - Clerk component styling (buttons, forms, inputs, social buttons)
- `/src/app/login.css` - Generic login page styling

---

## 🚀 Next Steps to Test

1. **Restart the development server:**
   ```bash
   cd /sessions/blissful-kind-ritchie/mnt/siteTEFL\ LH3003
   npm run dev
   ```

2. **Test the pages:**
   - Visit `http://localhost:3003/sign-in`
   - Visit `http://localhost:3003/sign-up`
   - Both should now display the Clerk authentication forms (not Chrome crash)

3. **Verify the links work:**
   - Click "Log in" link from the navigation
   - Click "Create free account" from the homepage CTA
   - Both should navigate to their respective pages

---

## 📋 Files Modified

1. ✏️ `/src/next.config.ts`
   - Removed invalid Set-Cookie header configuration
   - Retained all other CORS and CSP headers needed for Clerk iframe

2. ✏️ `/src/next.config.js`
   - Added comment noting it's superseded by next.config.ts

3. ✨ `/src/app/sign-up/layout.tsx` (NEW)
   - Created missing layout wrapper for sign-up route
   - Handles Clerk loading/loaded states

---

## 🎯 Expected Result After Rebuild

Both `/sign-in` and `/sign-up` pages should:
- Display the Clerk authentication form centered on the page
- Show a light teal gradient background matching the site design
- Support email/password authentication
- Support OAuth options (if configured in Clerk dashboard)
- Properly handle form submission and redirect to dashboard

If you still see errors after restarting the dev server, the issue may be:
1. Clerk API keys not valid for the current environment
2. Clerk project not configured in Clerk dashboard
3. Missing Clerk instance configuration

---

## 📞 Clerk Dashboard Checklist

Verify in your Clerk Dashboard (https://dashboard.clerk.com):
- [ ] Correct publishable key matches `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] Correct secret key matches `CLERK_SECRET_KEY`
- [ ] OAuth providers (Google, etc.) are enabled (if needed)
- [ ] Sign-in and sign-up are both enabled
- [ ] Redirect URLs are configured:
  - After sign-in: `/dashboard` or `/`
  - After sign-up: `/dashboard` or `/`
