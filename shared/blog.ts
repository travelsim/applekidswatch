// Six original blog posts per brand. Titles, angles, examples and pricing
// references are brand-specific: no post body is reused verbatim across
// brands, because the audience, market, currency and plan set differ.

import { type BrandDefinition } from "./brands";

export interface BlogSeed {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  readTime: number;
}

interface KitPriceText {
  se2: string;
  s6: string;
  accessories: string;
}

const KIT_TEXT: Record<string, KitPriceText> = {
  applekidswatch: {
    se2: "A$239 (Grade B) to A$269 (Grade A)",
    s6: "A$349",
    accessories: "A$25 to A$89",
  },
  applekidswat: {
    se2: "EUR 179-209, or GBP 179-209",
    s6: "EUR 299, or GBP 259",
    accessories: "EUR 22-79",
  },
  applewat: {
    se2: "EUR 209-229",
    s6: "EUR 299",
    accessories: "EUR 22-79",
  },
  travelwat: {
    se2: "EUR 209-229",
    s6: "EUR 299",
    accessories: "EUR 19-34 for phone eSIMs, EUR 29 for the secure band",
  },
};

function money(brand: BrandDefinition): KitPriceText {
  return KIT_TEXT[brand.id] ?? KIT_TEXT.applekidswatch;
}

export function blogSeedFor(brand: BrandDefinition): BlogSeed[] {
  const m = money(brand);
  const planExample =
    brand.id === "applekidswatch"
      ? "A$11.99 a month or A$99 a year"
      : brand.id === "travelwat"
        ? "GBP 7.99, EUR 7.99, US$10.99 or A$11.99 a month"
        : "GBP 7.99 a month or GBP 69 a year, with the EU market at EUR 7.99 / EUR 69";

  return [
    {
      title: `Which kids' Apple Watch should you buy? A straight answer`,
      slug: `${brand.id}-which-kids-apple-watch`,
      category: "Buying guide",
      image: "/images/apple_watch_midnight.png",
      readTime: 7,
      excerpt: `The SE (2nd Gen) at ${m.se2} covers almost every family. Here is when the Series 6 at ${m.s6} is actually worth the extra.`,
      content: `Most families should buy the refurbished Apple Watch SE (2nd Gen) 40mm cellular, priced at ${m.se2} on this store. It is the smallest useful case for a 6-12 year old wrist, it runs Family Setup properly, and the grade pricing means you are not paying new-hardware money for a device your child will lose in a school bag within a fortnight.

Buy the Series 6 44mm (${m.s6}) only when one of these is true: your child is on a larger wrist and the 40mm looks visibly wrong; your child genuinely needs the larger battery for a full day of calls, tracking and music; or you want the always-on display so they can tell the time without waking the watch.

Do not buy a Series 9, Ultra or a GPS-only model for a child. The extra cost buys nothing a child uses, and a GPS-only watch will not receive or make calls away from a paired phone, which defeats the entire point.

One decision that is genuinely hard: Grade A or Grade B. Grade A is cosmetically closer to new. Grade B has light wear on the case or band. Functionally they are identical because we test the same things on both. If your child is hard on things anyway, Grade B is the better value and nobody will notice.

The single most common mistake is buying on storage. Apple Watches do not have storage variants. If a listing shows a "32GB" or "128GB" storage field for a watch, it is a phone template misapplied to a watch and the listing is wrong.`,
    },
    {
      title: `Setting up Family Setup takes about 10 minutes. Here is exactly how.`,
      slug: `${brand.id}-family-setup-walkthrough`,
      category: "Setup & activation",
      image: "/images/family_setup_pairing.png",
      readTime: 8,
      excerpt: `You need an iPhone 6s or later, about 10 minutes, and no carrier contract. Walk through pairing, activation and the safety settings worth turning on.`,
      content: `Before you start: an iPhone 6s or later running current iOS, the watch, a charger, and about ten minutes of uninterrupted time. That is the whole list.

Open the Watch app on the iPhone, choose Set Up for a Family Member, and hold the watch near the phone. Pairing takes under a minute.

Next comes the child's Apple Account. Your child needs one to use the watch, and if they do not have one, setup walks you through creating it with their name and birth date. If they are under 13 you will need to handle the parental consent step yourself.

Then the part everyone gets wrong: the connectivity plan. This is where people assume they need a telco contract. They do not. A standalone watch eSIM works independently of your phone carrier - you are not asking Telstra or EE to add anything to your account, and no one needs to speak to your mobile provider at any point. On this store the plan is ${planExample}.

Activation on the watch takes a couple of minutes and needs the watch on its charger and near the iPhone. Once it resolves, your child can call and message you and share location.

Finally, the settings that actually matter. Set Schooltime so the watch locks down during class. Restrict contacts to approved people only - this is a single toggle and it is the difference between a phone and a closed walkie-talkie. Turn on location sharing. Practice Emergency SOS once, together, so it is muscle memory rather than something they read about in a crisis.

If a step fails, it is almost always because the watch is not on its charger or the iPhone is not on Wi-Fi. Nothing else.`,
    },
    {
      title: `The plan does not travel. Read this before you buy.`,
      slug: `${brand.id}-home-country-only-plan-reality`,
      category: "Safety & privacy",
      image: "/images/apple_watch_cellular.png",
      readTime: 5,
      excerpt: `A watch plan works in the country it was bought for. It will not roam. Here is what actually happens on a family holiday, and what to do instead.`,
      content: `This is the single most misunderstood thing about watch plans, and getting it wrong turns a holiday into a dead watch and an angry support ticket.

A standalone watch plan is valid in the country it was purchased for. It does not roam across borders. An Australian plan does not connect in Japan. A UK plan does not connect in France. This is not a limitation of our store or of the hardware - it is how these watch networks are licensed and operated in every supported market.

So: what actually happens when a family travels?

If the watch stays home, nothing happens. The plan works exactly as normal.

If the watch goes with you, it will lose signal outside its home country. Calls fail. Messages fail. Location updates stop at the last known point. Anyone relying on it for safety abroad is relying on something that has already stopped working.

The workaround is real and simple. Before travelling, activate a watch plan for your destination country. Supported markets are Australia, the United States, the United Kingdom, France, Germany, the Netherlands, Poland and Spain. For destinations outside that list, the phone eSIM route is the answer - put a data eSIM on the paired iPhone, and the watch shares that data over Bluetooth from close range. The watch works, it just does not work at long range.

${brand.shipsTo.includes("Worldwide") ? "We sell destination-country watch plans and 160-country phone eSIMs for exactly this reason." : "Travel accessories and phone eSIMs are sold on our travel store, Travel Wat, for exactly this reason."}

We would rather tell you this on the product page than take the order and explain it later.`,
    },
    {
      title: `Refurbished versus new: the honest comparison`,
      slug: `${brand.id}-refurbished-versus-new`,
      category: "Comparisons",
      image: "/images/why_refurbished.png",
      readTime: 6,
      excerpt: `Same hardware, same warranty, roughly half the price. Here is what refurbished actually means and what it does not mean.`,
      content: `Refurbished should be a straightforward trade: the same device, tested, at a lower price. Here is ours specifically.

What we check on every watch: the display, the touch layer, the speaker and microphone, the buttons and digital crown, the heart rate sensor, charging, battery health, and water resistance. Battery health is guaranteed at 85% or better at dispatch. A watch that fails any of these does not ship.

What "Grade A" means: minimal signs of use. Cosmetically close to new.

What "Grade B" means: light cosmetic wear. Light scratches on the case, maybe a mark on the band. Nothing functional.

What refurbished does not mean: it does not mean a cracked screen you did not notice, a dead battery, or a warranty void. Those are defects, and they are why we test.

The real argument for refurbished on a kids' watch is durability of ownership. If the watch is scuffed in month two, that emotional cost is much lower when you did not pay new-hardware money. Parents consistently tell us this is the deciding factor, and it is a rational one.

The argument against refurbished is that a new device has an untouched warranty. If you have a warranty-obsessed view, buy new and accept the price. We sell refurbished because for a device designed to be dropped on concrete by a nine-year-old, the maths strongly favours it.

One more thing. When you buy from this store the watch is a standalone cellular model. It is not tied to your telco, and there is no carrier lock to unlock. That freedom is worth more than the warranty period difference.`,
    },
    {
      title: `Is a kids' watch right for your child?`,
      slug: `${brand.id}-is-a-watch-right-for-your-child`,
      category: "Buying guide",
      image: "/images/child_wearing_smartwatch.jpg",
      readTime: 6,
      excerpt: `Age, wrist size, and whether they will actually wear it. Three honest checks before you spend anything.`,
      content: `Three checks, and they will save you a return.

Age. Below about six, a watch is mostly a screen they will not read and a device you will charge. The value of a watch is the child being able to contact you when they are away from you, and very young children cannot reliably do that. Six is a reasonable floor. Above ten, most children outgrow the social appeal and start asking for a phone anyway.

Wrist. The 40mm case suits roughly a 13cm to 17cm wrist, which is most 6-11 year olds. If the watch visibly overhangs, it will get knocked, and the child will take it off within a week. If it is loose, it slides and gets lost. The Sport Loop band we supply adjusts down and up, so measure before you order rather than guessing.

Willingness. The single biggest factor in whether this works is whether your child wants to wear it. A watch they resent becomes a watch left at home, and a watch left at home is worthless. Let them pick the colour and the band.

If all three pass, you are buying well. What you are buying is independence, not surveillance. The watch lets a child walk to school, play at a friend's house, or sit on a bus without you being there, and lets them reach you if they need to. The location sharing is there so you can find them if it goes wrong - it is not the point.

If any of the three fail, save the money. A kids' watch that sits in a drawer costs more than the alternative, which is usually just waiting a year.`,
    },
    {
      title: `Setup support, returns, and what we actually do`,
      slug: `${brand.id}-support-returns-and-what-we-do`,
      category: "Care & troubleshooting",
      image: "/images/contact_support.png",
      readTime: 4,
      excerpt: `How to reach a human, how long a reply takes, what the returns window covers, and the four faults we see most often.`,
      content: `Support: message us from any page on this site. We answer within one business day, and we mean a person answering the actual question rather than a ticket number.

Returns: 30 days from delivery. If the watch is not what you expected, send it back and we refund it. Watches that arrive faulty are replaced, not refunded-and-requeued.

The four faults we see most often, and what they usually mean.

The watch will not activate. Almost always the watch was not sitting on its charger, or the iPhone was not on Wi-Fi. Put it back on the charger and retry.

A contact cannot reach the child. Check that Schooltime is not currently blocking messages, and that the person is in the approved contact list. Both settings are easy to forget about after a school run.

The watch shows no signal at home. A watch plan works in its home country. If you have moved countries since buying, or are testing the watch abroad, that is the expected behaviour rather than a fault - see our article on why plans do not travel.

Battery drains fast. Battery health is guaranteed at 85% or better at dispatch. Older battery chemistry in an older case, plus continuous location sharing and cellular signal searching in a weak-coverage area, will shorten a day. If a watch bought in the last six months cannot hold a working day, that is a fault and we will replace it.

One thing we will always tell you plainly. We do not publish customer testimonials on this site because we have not collected enough real ones to be worth reading. When we do, they will be real. Absence of reviews here is not a secret - it is just honesty.`,
    },
  ];
}
