# Design Guidelines: Refurbished Apple SE Watch E-Commerce

## Design Approach
**Reference-Based: Apple meets Modern E-Commerce**

Draw inspiration from Apple's trustworthy minimalism combined with Shopify's conversion-optimized patterns. Balance playful elements (for kids) with reassuring professionalism (for parents). Think: Apple Store + safety-first messaging + vibrant lifestyle imagery.

**Core Principles:**
- Trust through clarity and polish
- Safety as a visual theme (not just messaging)
- Dual audience: delight kids, reassure parents
- Product hero: Watch in authentic use contexts

## Typography
**Font Stack (Google Fonts):**
- Primary: Inter (all weights 400-700) - clean, readable, modern
- Headings: Display font size hierarchy: 48px/36px/24px desktop, 32px/24px/18px mobile
- Body: 16px/18px, line-height 1.6
- Buttons/CTAs: 14px uppercase, tracking widest

## Layout System
**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 md:py-24
- Component spacing: gap-8 or gap-12
- Card padding: p-6 or p-8
- Max widths: Container max-w-7xl, Content max-w-6xl, Text max-w-3xl

## Page Structure & Sections

### Homepage
1. **Hero Section** (80vh)
   - Large lifestyle image: Parent watching child video call on watch outdoors
   - Centered headline + subheadline overlay with blur-background CTAs
   - Trust indicators below fold: "Apple Certified" "30-Day Guarantee" "Free Shipping"

2. **Safety Features Grid** (3 columns desktop, 1 mobile)
   - GPS Tracking, Safe Contacts, Geofencing - each with icon + description + product image
   
3. **How It Works Timeline** (horizontal cards, 3-4 steps)
   - Visual journey: Choose → Activate → Connect → Peace of Mind

4. **Product Showcase** (2-column asymmetric)
   - Left: Large watch beauty shot with feature callouts
   - Right: Specifications, Better Roaming integration details

5. **Parent Testimonials** (2-column grid)
   - Real parent photos + quotes emphasizing safety/value
   
6. **For Kids Section** (playful, single column centered)
   - Fun watch faces, games, approved apps - vibrant imagery

7. **Blog Preview** (3-column cards)
   - Latest articles: "Setting Up Your Child's First Watch" etc.

8. **Final CTA + Footer**

### Product Pages
- Large image gallery (60% width) with thumbnail navigation
- Sticky buy box (40% width): Price, refurbishment grade, CTA, trust badges
- Tabs: Features | Safety | Specs | Reviews
- Related products carousel

### Blog
- Magazine-style grid layout
- Large featured article (full-width card)
- 3-column article grid below
- Categories: Safety Tips, Setup Guides, Parenting Tech

## Component Library

**Navigation:**
- Sticky header: Logo left, "Shop | Blog | Safety | Support" center, Cart + Search right
- Mobile: Hamburger with full-screen overlay

**Product Cards:**
- Image with subtle shadow
- Grade badge (Excellent/Good/Fair) top-right corner
- Title, starting price, "View Details" link
- Rounded corners (rounded-2xl)

**CTAs:**
- Primary: Large, rounded-full, blur-background when over images
- Secondary: Outline variant
- Size hierarchy: Large (hero), Medium (sections), Small (cards)

**Trust Badges:**
- Apple Certified logo, warranty shield, secure payment icons
- Display in footer + key conversion points

**Forms:**
- Newsletter: Single-line email + button, integrated into footer
- Contact: 2-column layout (form left, info/map right)

## Images

**Required Imagery:**

1. **Hero Image:** Wide-angle outdoor shot - child (8-10 yrs) smiling, showing watch to parent, natural lighting, authentic moment
2. **Safety Features:** 3 lifestyle images showing GPS in park, video call at home, geofencing notification
3. **Product Photography:** Multiple angles of watch, close-ups of interface, charging, packaging
4. **Kids Using Watch:** 5-6 diverse children in various scenarios - playing, school, calling parent
5. **Parent-Child Moments:** 3-4 images emphasizing peace of mind, connection, security
6. **Blog Headers:** Relevant contextual images per article
7. **Better Roaming Integration:** Visual of SIM card, setup process, network coverage map

**Image Treatment:**
- Bright, natural lighting
- Authentic, not overly staged
- Diverse representation of families
- Consistent aspect ratios: Hero 16:9, Cards 4:3, Products 1:1

## Interactions
**Minimal, purposeful animations:**
- Smooth scroll between sections
- Product image zoom on hover (product pages only)
- Card lift on hover (subtle shadow increase)
- NO distracting scroll-triggered animations

## Accessibility
- Focus states visible on all interactive elements
- Alt text for all product and lifestyle images
- Minimum contrast ratios maintained throughout
- Keyboard navigation fully supported

**Conversion Optimizations:**
- Trust signals at every key decision point
- Clear refurbishment grade transparency
- Parent-focused safety messaging above fold
- Kid appeal through vibrant, fun imagery lower in page
- Streamlined checkout with Apple Pay integration