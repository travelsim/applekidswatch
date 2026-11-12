import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { useBrand } from "@/lib/brand";
import { breadcrumbList } from "@/lib/structured-data";

const connectivityOptions = [
  {
    name: "Better Roaming",
    kind: "Standalone kids watch plan",
    description:
      "A standalone watch plan designed for Family Setup without a phone. Listed alongside other connectivity options — no partnership is implied.",
    points: [
      "Works in its home market only (see home-country clause)",
      "No telco contract required to use the watch",
      "Monthly and annual terms where available",
    ],
  },
  {
    name: "ALDI Mobile",
    kind: "Phone and watch plan carrier",
    description:
      "A phone-plan carrier; your existing phone plan can stay separate from the watch's standalone line. Listed as one connectivity option among others.",
    points: [
      "Phone plan remains on your existing carrier",
      "Watch uses its own line; no need to change phone carrier",
      "Check current plan terms at checkout",
    ],
  },
  {
    name: "Optus, Vodafone, Boost, Belong, Amaysim",
    kind: "Phone carriers that work alongside watch plans",
    description:
      "These are the phone-plan carriers our families have used alongside standalone watch plans. They are not watch-plan providers; the watch line is separate.",
    points: [
      "Phone plan is independent of the watch line",
      "Works with Family Setup and standalone watch connectivity",
      "Confirm current terms with carrier",
    ],
  },
];

const faqs = [
  {
    q: "Do I need to change my phone carrier?",
    a: "No. The watch uses its own standalone line. Your phone plan — Optus, Vodafone, Telstra, or any other carrier — stays as it is. ALDI Mobile, Optus and the others listed are phone carriers, not watch-plan providers.",
  },
  {
    q: "Is Better Roaming a partner or exclusive provider?",
    a: "No. Better Roaming is listed as one connectivity option among others. No partnership, affiliation or exclusivity is implied.",
  },
  {
    q: "Where do I compare plans?",
    a: "Use this Connectivity options page to compare the shortlisted options side-by-side. Where a sourced price is shown it comes from the provider's published plan pages; otherwise no price is shown.",
  },
];

export default function Connectivity() {
  const { brand } = useBrand();
  useSeo({
    title: `Connectivity options | ${brand.name}`,
    description:
      "Independent comparison of standalone watch connectivity options — Better Roaming, ALDI Mobile and other shortlisted carriers — with no partnership claim.",
  });

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbList([{ name: "Home", path: "/" }, { name: "Connectivity", path: "/connectivity" }]),
        }}
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge variant="outline">Connectivity</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mt-4">Connectivity options</h1>
            <p className="text-lg text-muted-foreground mt-3">
              Better Roaming is shown as one option among others. No partnership, affiliation or exclusivity is implied.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {connectivityOptions.map((opt) => (
              <Card key={opt.name} className="hover-elevate">
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm font-semibold">{opt.name}</p>
                  <p className="text-xs text-muted-foreground">{opt.kind}</p>
                  <p className="text-sm text-muted-foreground">{opt.description}</p>
                  <ul className="space-y-2">
                    {opt.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-10 space-y-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">
                  Independent retailer. Not affiliated with, endorsed by or sponsored by Better Roaming, ALDI, Optus, Vodafone, Boost,
                  Belong, Amaysim, Apple Inc. or Spacetalk Ltd. Better Roaming is presented as one of several connectivity options. Prices where
                  shown come from published provider plan pages; where no sourced price is available none is shown.
                </p>
              </CardContent>
            </Card>
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">Frequently asked</h2>
              {faqs.map((f, i) => (
                <Card key={i}>
                  <CardContent className="p-6 space-y-2">
                    <p className="font-semibold">{f.q}</p>
                    <p className="text-sm text-muted-foreground">{f.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg">Shop watches <ArrowRight className="h-5 w-5 ml-2" /></Button>
              </Link>
              <Link href="/safety">
                <Button size="lg" variant="outline">Learn about safety</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
