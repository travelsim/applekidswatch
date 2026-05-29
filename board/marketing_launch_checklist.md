# Marketing Launch Checklist — AppleKidsWatch

**Prepared by:** CMO
**Date:** May 29, 2026
**Status:** Pre-Launch
**Budget:** $800 (Month 1 Search + Shopping)
**Referenced Docs:** goto_market.md, viability_assessment.md, competitive_analysis.md, content_calendar.md, seo_keywords.md

---

## Phase 0: Pre-Launch Foundation (Do These First)

### □ 0.1 Domain & Technical Setup
- [ ] **Verify applekidswatch.com is live and resolving** — check DNS, SSL certificate valid
- [ ] **Set up Google Search Console** — https://search.google.com/search-console
  - Verify domain ownership (DNS TXT record)
  - Submit sitemap.xml
- [ ] **Set up Google Analytics 4** — https://analytics.google.com
  - Install GA4 tracking code on all pages
  - Set up conversion tracking (Add to Cart, Purchase, Sign Up)
  - Set up ecommerce events (view_item, add_to_cart, purchase)
- [ ] **Configure sitemap.xml**
  - Ensure sitemap includes: all product pages, all blog posts, about page, contact page
  - Auto-updating via Drizzle ORM queries (if sitemap is dynamic)
- [ ] **Set up robots.txt** — allow all crawlers, point to sitemap
- [ ] **Set up 404 page** — include search + popular products links

### □ 0.2 On-Page SEO (All Product Pages)
- [ ] Write unique **title tags** (per product: model, grade, "for kids", "Family Setup")
- [ ] Write unique **meta descriptions** (150–160 chars, includes primary keyword + CTA)
- [ ] Set **H1s** — unique per page, includes primary keyword
- [ ] Add **Open Graph tags** (og:title, og:description, og:image, og:url)
- [ ] Add **Twitter Card tags** (summary_large_image)
- [ ] Add **Product schema** (JSON-LD) — name, description, brand, offers, condition, price, warranty
- [ ] Add **BreadcrumbList schema** (for Google SERP crumbs)
- [ ] Add **FAQ schema** on product pages (common parent questions)
- [ ] Add **alt text** to all product images (descriptive, includes keywords)
- [ ] Ensure **canonical URLs** set correctly (avoid duplicate content)
- [ ] Check **page load speed** — target < 2s on mobile (Lighthouse test)

### □ 0.3 Content Infrastructure
- [ ] Confirm blog directory/path routing works (e.g., /blog/{{slug}})
- [ ] Confirm blog posts render from DB (Drizzle queries correct)
- [ ] Test internal linking: each post links to 2+ other posts + 1 product page
- [ ] Add author byline + date to every blog post template

### □ 0.4 Trust Signals (Site-Wide)
- [ ] Warranty badge on every product page
- [ ] 30-day return policy link in footer
- [ ] Secure checkout badge (SSL, payment icons)
- [ ] Contact page with email / form
- [ ] Privacy Policy page linked in footer
- [ ] Terms of Service page linked in footer
- [ ] About Us page (explain refurbishment process, why we do this)

---

## Phase 1: Week 1 — Soft Launch

### □ 1.1 Content Publishing (3 Posts)
- [ ] Publish "Is Your Child Ready for a Smartwatch?" → /blog/is-your-child-ready-smartwatch
- [ ] Publish "Apple Watch Family Setup: A Parent's Complete Guide" → /blog/apple-watch-family-setup-guide
- [ ] Publish "GPS Tracking for Kids: What Parents Need to Know" → /blog/gps-tracking-kids-parents-guide
- [ ] **SEO per post:**
  - [ ] Meta description written (150–160 chars)
  - [ ] OG image created (1200×630, Canva free)
  - [ ] Internal links to products + 2 other posts
  - [ ] Featured image with alt text

### □ 1.2 Google Search Ads Setup (Budget: $500)
- [ ] **Create Google Ads account** — https://ads.google.com
- [ ] **Set up conversion tracking:**
  - [ ] Purchase conversion action (value = transaction value)
  - [ ] Add to Cart conversion action
  - [ ] Page view / session quality tracking
- [ ] **Create Search Campaign (Smart Shopping not available for new accounts):**
  - [ ] Campaign type: Search (with Display opt-out)
  - [ ] Network: Google Search Network only (uncheck Display, uncheck YouTube)
  - [ ] Locations: United States (or target country)
  - [ ] Languages: English
  - [ ] Target ROAS: set to "Maximize Clicks" initially (gather data first 2 weeks)
  - [ ] Daily budget: ~$17/day ($500 / 30 days)
- [ ] **Ad Group 1: "Apple Watch for Kids"**
  - Keywords: refurbished apple watch for kids, apple watch for kids without phone, apple watch for child, best smartwatch for kids
  - Ad copy: Headline 1: "Apple Watch for Kids — From $179", Headline 2: "GPS, iMessage, Safety Features", Description: "Refurbished Apple Watch SE. Family Setup ready. 1-year warranty. The real Apple Watch for your kid. For less."
  - Final URL: https://applekidswatch.com
- [ ] **Ad Group 2: "Family Setup"**
  - Keywords: apple watch family setup, set up apple watch for child, family setup apple watch
  - Ad copy: Headline 1: "Apple Watch Family Setup Guide", Headline 2: "Set Up Your Kid's Watch in 5 Minutes", Description: "Step-by-step guide included. GPS, iMessage, Schooltime. Family Setup made simple."
  - Final URL: https://applekidswatch.com/blog/apple-watch-family-setup-guide
- [ ] **Ad Group 3: "Kids GPS Tracker"**
  - Keywords: kids gps tracker, gps tracker for kids, smartwatch for kids with gps
  - Ad copy: Headline 1: "GPS Tracker for Kids — $179", Headline 2: "Real-Time Location + Geofencing", Description: "Apple Watch with GPS, Find My, Emergency SOS. Certified refurbished. Better than any kid tracker."
  - Final URL: https://applekidswatch.com
- [ ] Add negative keywords: android, samsung, fitbit, used (already implied by refurbished)
- [ ] Set ad schedule: 6 AM – 10 PM (parent browsing hours)
- [ ] Set location: United States (or primary market)

### □ 1.3 Google Shopping Setup (Budget: $300)
- [ ] **Create Google Merchant Center account** — https://merchants.google.com
- [ ] **Verify domain** in Merchant Center (same DNS verification as Search Console)
- [ ] **Create product feed:**
  - [ ] Product IDs match website SKUs
  - [ ] Title format: "Refurbished Apple Watch SE {{Gen}} {{Size}} for Kids — Grade {{Grade}}"
  - [ ] Description includes: grade condition, Family Setup compatible, 1-year warranty, features
  - [ ] Google Product Category: Electronics > Wearable Technology > Smartwatches
  - [ ] Condition: refurbished
  - [ ] GTIN: Include Apple model number (e.g., MRE83LL/A) if available
  - [ ] Brand: Apple
  - [ ] Link: Direct product URL
  - [ ] Image link: High-quality product photo (white background recommended)
  - [ ] Price + availability
  - [ ] Shipping info (free shipping offer if possible)
  - [ ] Tax info
- [ ] **Review feed in Diagnostics tab** — fix any disapprovals
- [ ] **Create Shopping campaign:**
  - [ ] Campaign type: Shopping
  - [ ] Bid strategy: Maximize Clicks (gather data first)
  - [ ] Daily budget: ~$10/day ($300 / 30 days)
  - [ ] Product filter: All products
  - [ ] Priority: High

### □ 1.4 Social Media — Week 1 Presence
- [ ] **Create social profiles:**
  - [ ] Instagram: @AppleKidsWatch (or similar)
  - [ ] Threads: @AppleKidsWatch
  - [ ] X/Twitter: @AppleKidsWatch
  - [ ] Pinterest: AppleKidsWatch (for Phase 2)
- [ ] **Profile setup:**
  - [ ] Profile photo (AppleKidsWatch logo)
  - [ ] Bio: "The real Apple Watch for your kid. Refurbished, Family Setup ready. GPS tracking, iMessage, safety. From $179. 🛡️ ⌚"
  - [ ] Link in bio → applekidswatch.com
- [ ] **Week 1 Posts:**
  - [ ] Post 1: Launch announcement — "We're live! Apple Watch for kids, refurbished & ready."
  - [ ] Post 2: "5 reasons Apple Watch > TickTalk for your kid" (carousel)
  - [ ] Post 3: Customer testimonial placeholder / behind-the-scenes refurbishment

---

## Phase 2: Week 2 — Expand Content & Ads

### □ 2.1 Content Publishing (2 Posts)
- [ ] Publish "Refurbished vs New Apple Watch for Kids: Which is Better?" → /blog/refurbished-vs-new-apple-watch-kids
- [ ] Publish "Setting Up Parental Controls on Apple Watch" → /blog/apple-watch-parental-controls-guide

### □ 2.2 Ads Optimization
- [ ] **Week 1 ad performance review:**
  - [ ] Check CTR, CPC, conversion rate
  - [ ] Pause low-performing keywords
  - [ ] Add new keywords from search term report
- [ ] **Add remarketing:**
  - [ ] Create Google Ads remarketing tag (pixel)
  - [ ] Build audience: "All site visitors" (30-day window)
  - [ ] Build audience: "Product page viewers, no purchase"
  - [ ] Add to Remarketing campaign (Display Network, $5/day)

### □ 2.3 Community Engagement
- [ ] **Reddit:**
  - [ ] Post on r/daddit: "What age did you get your kid a connected device?"
  - [ ] Reply genuinely on r/AppleWatch: Family Setup threads
  - [ ] Reply on r/parenting: Smartwatch recommendation threads
- [ ] **Facebook:**
  - [ ] Join 3–5 parenting groups (Mom Hacks, Tech-Savvy Parents, etc.)
  - [ ] Participate naturally (no direct links initially)

---

## Phase 3: Week 3 — Comparison Content

### □ 3.1 Content Publishing (2 Posts)
- [ ] Publish "TickTalk vs Apple Watch for Kids: Honest Comparison" → /blog/ticktalk-vs-apple-watch-kids
- [ ] Publish "Garmin Bounce vs Apple Watch SE: Which is Better?" → /blog/garmin-bounce-vs-apple-watch-se

### □ 3.2 Social Media
- [ ] Post "Winner: Apple Watch vs TickTalk" comparison graphic on Instagram
- [ ] Share comparison post on Reddit (in relevant threads)
- [ ] Pinterest pins for both comparison posts

### □ 3.3 Ads Optimization
- [ ] Check if Smart Bidding data is sufficient to switch from "Maximize Clicks" to "Target CPA"
- [ ] Add customer reviews / testimonials to ad extensions if available
- [ ] Test 2 new ad variations per ad group

---

## Phase 4: Week 4 — Authority Content & First Orders

### □ 4.1 Content Publishing (2 Posts)
- [ ] Publish "The Ultimate Guide to Apple Watch Safety Features" → /blog/apple-watch-safety-features-kids

### □ 4.2 First Orders Ship
- [ ] Send **Email 1 (Order Confirmation)** — auto-triggered on purchase
- [ ] Send **Email 2 (Shipped)** — auto-triggered on fulfillment
- [ ] Prepare **Email 3 (Delivered + Setup Guide)** template

### □ 4.3 Month 1 Review
- [ ] **Run monthly report:**
  - [ ] Total orders
  - [ ] Revenue
  - [ ] Ad spend vs ROAS
  - [ ] Organic traffic (GA4)
  - [ ] Keyword rankings (manual check top 10)
  - [ ] Email signups
- [ ] **Adjust Phase 2 budget** (GTM calls for $1,200 Search + $400 Shopping in Month 2)
- [ ] **Review competitor movement** — check for pricing changes, new products

---

## Phase 5: Month 2 — Scale & Grow

### □ 5.1 New Content (4 Posts — See Content Calendar Weeks 5–8)
- [ ] "Is Apple Watch Safe for a 7 Year Old?"
- [ ] "Best Apple Watch Settings for Kids (Step by Step)"
- [ ] "How to Save Money on Apple Watch for Kids"
- [ ] "Kids Smartwatch Monthly Costs Compared"

### □ 5.2 Email Marketing
- [ ] Set up email tool (Mailchimp Free, ConvertKit Free, or Brevo Free)
- [ ] Create signup form with 10% discount offer
- [ ] Add signup popup to blog posts
- [ ] Send first newsletter (weekly roundup)
- [ ] Send Email 4 (Day 7 tips) to existing customers

### □ 5.3 Ad Expansion
- [ ] Increase Google Search budget to ~$27/day
- [ ] Increase Shopping budget to ~$13/day
- [ ] Add new ad groups based on Month 1 search term data
- [ ] Launch Instagram/Facebook ads ($15/day) — lifestyle imagery
- [ ] Create retargeting audiences for social ads

### □ 5.4 Pinterest Launch
- [ ] Create 5 boards: "Apple Watch for Kids", "Kids Safety Tech", "Parenting Tips", "Apple Watch Accessories", "Refurbished Tech Deals"
- [ ] Pin each blog post + product page
- [ ] Create 3 custom pins (vertical infographics)

---

## Phase 6: Month 3 — Optimize & Expand

### □ 6.1 New Content (4 Posts — See Calendar Weeks 9–12)
- [ ] Schooltime Mode Guide
- [ ] At What Age Should Kids Get a Smartwatch?
- [ ] GPS Tracker vs Smartwatch
- [ ] AppleKidsWatch Brand Review

### □ 6.2 Referral Program Launch
- [ ] Implement referral tracking (shareable link + $20 off)
- [ ] Send Email 5 (Day 30 referral offer) to existing customer base
- [ ] Add referral CTA on thank-you / confirmation page

### □ 6.3 Full Content Audit
- [ ] Check all indexed pages in Search Console
- [ ] Review top-performing content → create more of the same format
- [ ] Check for broken links
- [ ] Update any stale statistics or pricing

### □ 6.4 Evaluate YouTube Channel
- [ ] Create channel: AppleKidsWatch
- [ ] Upload "How to Set Up Apple Watch for Your Child" video
- [ ] Upload "AppleWatch Unboxing + First Impressions" (once inventory is ready)
- [ ] Add video to product pages (embed)

---

## Ongoing — Weekly Tasks

### Every Monday
- [ ] Publish blog post (per content calendar)
- [ ] Review Google Ads performance (past 7 days)
- [ ] Check Search Console for new queries/indexing issues
- [ ] Respond to any customer inquiries (email, social)

### Every Friday
- [ ] Share week's blog post on social media
- [ ] Post 1 community engagement (Reddit, Facebook group)
- [ ] Review analytics: traffic, conversions, email signups
- [ ] Plan next week's ad optimizations

---

## Ongoing — Monthly Tasks

- [ ] Full P&L review (revenue, COGS, ad spend, margin)
- [ ] SEO rank check (top 20 keywords, note movements)
- [ ] Competitor scan (new products, price changes, new blog posts)
- [ ] Email list growth report
- [ ] Content performance audit (top 5 posts by traffic, top 3 by conversion)
- [ ] Update content calendar for next month
- [ ] Customer feedback review (reviews, emails, support tickets)
- [ ] Inventory check vs demand forecast

---

## Budget Tracking

### Month 1 Budget Allocation ($800 total)

| Channel | Budget | Actual Spend | Notes |
|---------|--------|-------------|-------|
| Google Search Ads | $500 | — | $17/day target |
| Google Shopping Ads | $300 | — | $10/day target |
| Facebook/Instagram | $0 | — | Phase 2 allocation |
| Content tools | $0 | — | Free tiers |
| **Total** | **$800** | **—** | **Per GTM plan** |

### Month 2 Estimated (Escalation requires CEO approval)

| Channel | Budget | Status |
|---------|--------|--------|
| Google Search Ads | $800 | CEO sign-off required before spending |
| Google Shopping Ads | $400 | CEO sign-off required before spending |
| Facebook/Instagram Ads | $400 | CEO sign-off required before spending |
| **Total** | **$1,600** | **Awaiting approval** |

---

## Key Contacts & Accounts

| Platform | Account | Status |
|----------|---------|--------|
| Google Ads | [ ] Create | Pending |
| Google Merchant Center | [ ] Create | Pending |
| Google Search Console | [ ] Set up | Pending |
| Google Analytics 4 | [ ] Set up | Pending |
| Instagram / Threads | [ ] Create | Pending |
| X/Twitter | [ ] Create | Pending |
| Pinterest | [ ] Create | Phase 2 |
| Email tool | [ ] Choose | Weeks 5–6 |

---

## Items Requiring CEO Approval

- [ ] Month 1 ad spend ($800) — already approved per GTM plan
- [ ] Month 2 ad spend increase to $1,600
- [ ] Launch promo (10% off first 100 orders)
- [ ] Referral program ($20 off per referral)
- [ ] Extended warranty upsell ($19.99)

---

**Checklist prepared by:** CMO
**Next review:** End of Week 1
