import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { useBrand } from "@/lib/brand";
import { breadcrumbList } from "@/lib/structured-data";
import { WATCH_BANDS } from "@shared/bands";

export default function Bands() {
  const { brand } = useBrand();
  useSeo({
    title: `Watch bands | ${brand.name}`,
    description: "Kid-suitable watch bands for Apple Watch and a Spacetalk replacement strap, each linked to the manufacturer's official page.",
  });

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Watch bands", path: "/bands" },
          ]),
        }}
      />
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4">Watch bands</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 playful-heading" data-testid="text-bands-title">
              Swap the band, keep the watch going
            </h1>
            <p className="text-lg text-muted-foreground">
              Bands that suit a child's wrist, each linked to the manufacturer's official page. Prices are not listed here yet, so each band shows Price TBC until a sourced listing is confirmed.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WATCH_BANDS.map((band) => (
              <Card key={band.sku} className="overflow-visible hover-elevate" data-testid={`card-band-${band.sku}`}>
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <img src={band.image} alt={band.imageAlt} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{band.brand}</p>
                      <h2 className="font-semibold text-base leading-tight">{band.name}</h2>
                    </div>
                    <p className="text-sm">{band.description}</p>
                    <dl className="text-xs text-muted-foreground space-y-1">
                      <div><dt className="inline font-medium">Fits: </dt><dd className="inline">{band.forWatch}</dd></div>
                      <div><dt className="inline font-medium">Material: </dt><dd className="inline">{band.material}</dd></div>
                      <div><dt className="inline font-medium">Size: </dt><dd className="inline">{band.fit}</dd></div>
                    </dl>
                    <p className="text-xl font-bold">Price TBC</p>
                    <a href={band.source} target="_blank" rel="nofollow noopener noreferrer" className="block" data-testid={`link-band-official-${band.sku}`}>
                      <Button variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Official page
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            Looking for a watch first? <Link href="/shop" className="underline">See the watches in the shop</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}