# Family Setup Video Integration Proposal — AppleKidsWatch

**Date:** May 31, 2026  
**Prepared for:** Deployment push  
**Source Material:** P2 Family Setup Video Walkthrough (8 scenes, Grok Imagine visuals in cache)

## Review of New Video Clips
- 10 high-quality generated visuals (scenes 1-8 + extras) covering unboxing, pairing, Apple ID creation, Schooltime, SOS, success, CTA.
- Script is parent/kid-friendly, 4:30-5:00 target, emphasizes 5-min setup, no kid iPhone needed, safety features.
- Strong CTA to applekidswatch.com/setup + QR.
- Ready for video production (voiceover, B-roll, editing) or direct use as interactive web experience.

## Recommended Integration Strategy for Maximum Impact
1. **Dedicated /setup Page (Primary Recommendation - Highest Impact)**
   - New route + page component.
   - Hero: Autoplay muted teaser clip or first scene image + "Watch 5-Min Family Setup".
   - Interactive scene-by-scene walkthrough (tabs or carousel) using the 8 visuals + script voiceover text + on-screen overlays.
   - Embedded full video placeholder (YouTube/Vimeo once edited) or HTML5 video.
   - Prominent CTA buttons: "Buy Now" linking to /shop, "Start Setup Guide" (PDF or in-app).
   - SEO: Title "Family Setup in 5 Minutes | AppleKidsWatch", meta for "apple family setup for kids watch".
   - Mobile-optimized, accessibility captions.

2. **Homepage Hero Video Teaser**
   - Replace or augment current static hero image with a short 15-30s looping clip from Scene 1 + play overlay button that opens modal or links to /setup.
   - Update headline to include "5-Minute Family Setup".

3. **Cross-Page Placement**
   - Add "Family Setup" nav item in Header linking to /setup.
   - Embed teaser in Safety.tsx and ProductDetail.tsx (near "How it works").
   - Footer quick link.

4. **Email Nurture Sequence (Complementary)**
   - Trigger welcome email with /setup link + first 2 scenes.
   - Day 3: Full walkthrough video embed.
   - Abandoned cart: "Stuck on setup? Watch our 5-min guide".
   - (Requires separate email tool integration.)

5. **Other High-Impact Ideas**
   - QR code on packaging/physical materials points to /setup.
   - Blog post: "Behind the 5-Min Family Setup" using scenes.
   - A/B test hero variants.

## Specific Site Updates (Actionable)
- **Add to App.tsx:** New Route path="/setup" component={Setup}
- **Create src/pages/Setup.tsx:** Full implementation using the scene images (import from cache or move to public/assets), React state for scene navigation, video embed stub.
- **Update Header.tsx:** Add nav link "Setup Guide" -> /setup
- **Update Home.tsx:** Add video teaser section or modal trigger; link "Learn Family Setup" button.
- **Assets:** Copy relevant cache images to client/public/assets/family-setup/ or reference appropriately.
- **Build & Deploy:** Run `npm run build`, then use existing deploy pipeline (render_api.py or railway).

## Deployment Push
- Prioritize /setup page + hero update for launch this week.
- After edits, test locally (`npm run dev`), build, then deploy.
- Track: Add analytics event for /setup views and CTA clicks.
- Follow-up: Once real video produced, replace image carousel with <video> element.

This integration will drive conversions by reducing setup anxiety and showcasing ease/safety. Ready to implement immediately.