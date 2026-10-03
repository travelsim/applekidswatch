import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { useBrand } from "@/lib/brand";
import { APPLE_NON_AFFILIATION, HOME_COUNTRY_CLAUSE } from "@shared/brands";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-3">
    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">
      {children}
    </div>
  </section>
);

export default function Legal() {
  const { brand, complianceNote } = useBrand();
  const origin = `https://${brand.domain}`;
  useSeo({
    title: `Legal, Returns & Warranty | ${brand.name}`,
    description: `Returns, warranty, shipping, privacy and terms for ${brand.name}, including our refurbished-condition disclosure and Apple non-affiliation notice.`,
    canonical: `${origin}/legal`,
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 space-y-12 max-w-3xl">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Legal &amp; trust</h1>
        <p className="text-muted-foreground">
          The things a buyer should be able to check before paying: what
          condition the device is in, what we will replace, how long we take to
          reply, and who we are not.
        </p>
      </header>

      <Section title="Who we are, and who we are not">
        <p data-testid="legal-non-affiliation">{complianceNote}</p>
        <p>
          {APPLE_NON_AFFILIATION} We are an independent reseller of refurbished
          devices. We buy used hardware, test it, repair what needs repair, and
          resell it. "Refurbished" here means refurbished by us &mdash; it does
          not mean Apple's own Certified Refurbished programme, and we do not
          claim it.
        </p>
      </Section>

      <Section title="Product condition: refurbished, not new">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Grades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>Grade A</strong> &mdash; minimal signs of use, cosmetically
              close to new.
            </p>
            <p>
              <strong>Grade B</strong> &mdash; light cosmetic wear. Light
              scratches on the case or a mark on the band. Nothing functional.
            </p>
            <p>
              Both grades are functionally identical. Every watch is tested
              before dispatch: display, touch, speaker, microphone, buttons,
              crown, heart-rate sensor, charging, battery health and water
              resistance. Battery health is guaranteed at 85% or better.
            </p>
          </CardContent>
        </Card>
        <p>
          Accessories are new unless a product page says otherwise. Imagery is
          representative stock photography rather than photography of the exact
          unit you will receive, because the unit you receive is a used device
          and we will not pretend otherwise.
        </p>
      </Section>

      <Section title="Returns">
        <p>
          30 days from delivery. If the watch is not what you expected, send it
          back for a refund. Return freight is the customer's responsibility
          unless the item was faulty or we shipped the wrong thing.
        </p>
        <p>
          A faulty watch is replaced, not refunded and re-queued. Contact us
          within the return window.
        </p>
      </Section>

      <Section title="Warranty and protection products">
        <p>
          Every watch carries a functional guarantee covering manufacturing
          faults. Optional protection plans cover accidental damage on the terms
          stated on their product page.
        </p>
        <p>
          Accidental-damage cover <strong>excludes</strong>: cosmetic wear,
          liquid damage beyond the watch's 50 metre rating, and loss or theft.
          We state these exclusions on the product page rather than burying them,
          because an unclear guarantee is the main source of disputes in this
          category.
        </p>
      </Section>

      <Section title="Shipping">
        <p>
          This store ships to {brand.shipsTo.join(", ")}.
          {brand.vatInclusive
            ? " Prices include VAT for European destinations."
            : " Prices exclude GST for Australian destinations; it is added at checkout."}
        </p>
        <p>
          Delivery windows and cross-border duty handling are published at
          checkout before you pay. We will not add a duty or handling fee that
          was not shown to you.
        </p>
      </Section>

      <Section title="Connectivity plans: home country only">
        <p data-testid="legal-home-country">{HOME_COUNTRY_CLAUSE}</p>
        <p>
          Our watch plans are sold for Australia, the United States, the United
          Kingdom, France, Germany, the Netherlands, Poland and Spain. There is
          no Swiss-local plan, because Switzerland is not a supported market
          for this kind of watch connectivity and we will not sell you one.
        </p>
        <p>
          Plans work on the watch itself. You do not need a telco contract, and
          your mobile carrier is irrelevant.
        </p>
      </Section>

      <Section title="Setup expectations">
        <p>
          Activation takes about ten minutes and needs an iPhone 6s or later with
          current iOS. There is no way to set the watch up without a parent or
          guardian present, and there is no way to avoid the restrictions: no
          social media apps and no open web browser.
        </p>
      </Section>

      <Section title="Privacy">
        <p>
          We collect what an order needs: name, email, shipping address and
          phone. Newsletter subscriptions are stored against the email address
          you provide and nothing more. We do not sell personal data and we do
          not run third-party advertising trackers on this store.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          <a
            href={`mailto:hello@${brand.domain}`}
            className="underline underline-offset-4"
          >
            hello@{brand.domain}
          </a>{" "}
          &mdash; we reply within one business day, and a person answers the
          actual question rather than issuing a ticket number.
        </p>
      </Section>

      <footer className="border-t pt-8 text-sm text-muted-foreground">
        <Link href="/" className="underline underline-offset-4">
          Back to {brand.name}
        </Link>
      </footer>
    </div>
  );
}