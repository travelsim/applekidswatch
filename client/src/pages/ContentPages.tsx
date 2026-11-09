import { ContentPage } from "@/components/ContentPage";
import { APPLE_NOTICE, BUSINESS_ADDRESS, useBrand } from "@/lib/brand";

const PLAN_HOME_ONLY =
  "This plan works in its home market only. It does not roam across borders. A UK plan does not connect in France. To travel, purchase a plan for your destination.";

export function LegalPage() {
  const { brand } = useBrand();
  return (
    <ContentPage
      path="/legal"
      title="Terms, Returns & Trust"
      seoTitle={`Returns, Warranty, Shipping & Privacy | ${brand.name}`}
      description={`Returns, warranty, shipping, privacy and terms for ${brand.name} refurbished Apple Watch kids kits, plus our Apple non-affiliation notice.`}
      intro="Everything you need to know before you buy: what 'refurbished' means, what is covered, and how returns and shipping work."
      sections={[
        {
          heading: "Refurbished, not new",
          paragraphs: [
            "Every watch sold on this site is a refurbished Apple Watch, not a new one. Each device is inspected, restored and tested before it is listed. Condition grade (A or B) is shown on every product page.",
            "Each kids kit is sold with battery health of 85% or higher at the time of sale.",
          ],
        },
        {
          heading: "Apple notice",
          paragraphs: [APPLE_NOTICE],
        },
        {
          heading: "Returns",
          paragraphs: [
            "[Return window and conditions: to be confirmed before launch.]",
          ],
        },
        {
          heading: "Warranty and guarantees",
          paragraphs: [
            "[Seller warranty period: to be confirmed before launch.] Apple's own limited warranty may not apply to a device sold by a third-party reseller. Check the product page for the warranty that applies to your watch.",
            "The Playground Damage Replacement Guarantee and the 3-Year Care Plan are optional add-ons. Both exclude cosmetic wear, liquid damage beyond the watch's 50-metre water resistance, and loss or theft.",
          ],
        },
        {
          heading: "Shipping",
          paragraphs: [
            "Shipping costs and delivery times are shown at checkout before you pay. [Shipping rates and destinations: to be confirmed before launch.]",
          ],
        },
        {
          heading: "Privacy",
          paragraphs: [
            "We collect only the details needed to take and fulfil an order and to reply to you. [Full privacy policy: pending review before launch.]",
          ],
        },
        {
          heading: "Terms of use",
          paragraphs: [
            "[Full terms of use: pending review before launch.] Plans sold on this site are subject to the home-market limitation below.",
            PLAN_HOME_ONLY,
          ],
        },
        {
          heading: "Business details",
          paragraphs: [
            `${brand.name}, ${BUSINESS_ADDRESS}. [ABN: to be added.]`,
          ],
        },
      ]}
    />
  );
}

export function EligibilityPage() {
  const { brand } = useBrand();
  return (
    <ContentPage
      path="/is-it-right-for-my-child"
      title="Is It Right for My Child?"
      seoTitle={`Is an Apple Watch Kids Kit Right for Your Child? | ${brand.name}`}
      description="Age guidance, band sizing and setup requirements to help you decide whether a refurbished Apple Watch kids kit suits your child."
      intro="A quick check on age, fit and what you need at home before you order."
      sections={[
        {
          heading: "Who it is designed for",
          paragraphs: [
            "The kids kits are designed for children aged roughly 6 to 12. If your child is outside that range, contact us before you order so we can talk through whether it suits them.",
            "The watch is a way to stay in touch and know where your child is. It does not replace supervision, and it works best when you agree on the rules together.",
          ],
        },
        {
          heading: "Fit and band sizing",
          paragraphs: [
            "Measure your child's wrist with a soft tape, just below the wrist bone. Check the band size listed on the product page before you order.",
            "Each kit includes a kid-friendly sport loop, a rugged bumper case and a magnetic charger. Spare bands are available as accessories.",
          ],
        },
        {
          heading: "What you need at home",
          paragraphs: [
            "Setup is done from your own iPhone, which needs to be an iPhone 6s or later.",
            "You do not need a Telstra contract or any particular phone carrier. The watch has its own plan. See the page on why you don't need Telstra.",
          ],
        },
      ]}
    />
  );
}

export function NoTelstraPage() {
  const { brand } = useBrand();
  return (
    <ContentPage
      path="/why-no-telstra"
      title="Why You Don't Need Telstra"
      seoTitle={`Apple Watch Cellular Plan Without a Telco Contract | ${brand.name}`}
      description="Keep your phone plan. Apple Watch Family Setup with a BetterRoaming kids plan works on any phone carrier, with no telco contract needed."
      intro="The watch has its own cellular plan, so the phone plan in your pocket doesn't matter."
      sections={[
        {
          heading: "Keep your phone plan",
          paragraphs: [
            "Usually a cellular Apple Watch needs an add-on from your phone carrier. With a BetterRoaming kids plan set up through Apple's Family Setup, the watch gets its own line. Your child's watch works whether you are on Optus, Vodafone, Boost, Belong, Aldi, Amaysim, Telstra or any other carrier.",
            "Keep the phone plan you already have. Nothing about it needs to change.",
          ],
        },
        {
          heading: "What the plan costs",
          paragraphs: [
            "BetterRoaming Kids Plan, Australia: A$11.99 a month, or A$99 a year. For the annual plan that works out to about A$8.25 a month.",
            "Pricing for other markets is shown on each product page.",
          ],
        },
        {
          heading: "Where the plan works",
          paragraphs: [
            PLAN_HOME_ONLY,
          ],
        },
      ]}
    />
  );
}

export function SetupPage() {
  const { brand } = useBrand();
  return (
    <ContentPage
      path="/setup"
      title="Setup & Activation"
      seoTitle={`Apple Watch Kids Setup in About 10 Minutes | ${brand.name}`}
      description="What setup involves for a refurbished Apple Watch kids kit: iPhone 6s or later, about 10 minutes to activate, and how the plan and approved contacts are set up."
      intro="Setup takes about 10 minutes from your iPhone. Here is what to expect."
      sections={[
        {
          heading: "What you need",
          paragraphs: [
            "An iPhone 6s or later, with the Apple Watch app. Your watch, its charger and about 10 minutes.",
          ],
        },
        {
          heading: "The steps",
          paragraphs: [
            "1. Charge the watch and turn it on.",
            "2. Pair it from your iPhone using Apple's Family Setup, following the prompts in the Apple Watch app.",
            "3. Activate the BetterRoaming kids plan for your home market. Your activation instructions come with your order.",
            "4. Choose approved contacts, and set Schooltime and other limits for your child.",
          ],
        },
        {
          heading: "Good to know",
          paragraphs: [
            "Activation takes about 10 minutes when your iPhone is connected to Wi-Fi or mobile data. Keep the watch charging until setup is complete.",
            PLAN_HOME_ONLY,
          ],
        },
      ]}
    />
  );
}

export function ContactPage() {
  const { brand } = useBrand();
  return (
    <ContentPage
      path="/contact"
      title="Contact Us"
      seoTitle={`Contact ${brand.name} | Preston, Victoria`}
      description={`Contact ${brand.name} about refurbished Apple Watch kids kits, plans, setup or an order. Based in Preston, Victoria, Australia.`}
      intro="Questions about a kit, a plan, setup or an order? Get in touch and we will reply."
      sections={[
        {
          heading: "Write to us",
          paragraphs: [
            "Email: [contact address: to be confirmed before launch]",
            "Response time: [to be confirmed before launch]",
          ],
        },
        {
          heading: "Business address",
          paragraphs: [
            `${brand.name}, ${BUSINESS_ADDRESS}.`,
          ],
        },
        {
          heading: "Before you write",
          paragraphs: [
            "Many questions are answered on the setup page, the eligibility page and the terms and returns page.",
          ],
        },
      ]}
    />
  );
}
