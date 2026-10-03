import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Watch, Mail, Shield, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useBrand } from "@/lib/brand";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { brand, complianceNote } = useBrand();
  const contactEmail = `hello@${brand.domain}`;

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed",
        description: "You'll receive setup guides and new product notices.",
      });
      setEmail("");
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribeMutation.mutate(email);
  };

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" data-testid="footer-link-home">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
                <Watch className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">{brand.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {brand.audience}
            </p>
            <p className="text-sm text-muted-foreground">
              Shipping to: {brand.shipsTo.join(", ")}.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-shop">
                All products
              </Link>
              <Link href="/shop?category=Kids%20watch%20kits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Watch kits
              </Link>
              <Link href="/shop?category=Connectivity%20plans" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Watch plans
              </Link>
              <Link href="/shop?category=Accessories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Accessories
              </Link>
              <Link href="/shop?category=Protection" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Protection
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Help &amp; trust</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-safety">
                Safety &amp; privacy
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-about">
                Is it right for my child?
              </Link>
              <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-legal">
                Legal, returns &amp; warranty
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-blog">
                Guides &amp; blog
              </Link>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
            </nav>
            <p className="text-xs text-muted-foreground">
              We reply to support email within one business day.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Setup guides and new product notices. No third-party marketing.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                aria-label="Email address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" disabled={subscribeMutation.isPending} data-testid="button-subscribe">
                {subscribeMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Claims here must be verifiable. "Apple Certified Refurbished" is
            Apple's own programme and must never be claimed by a reseller. */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-5 w-5" />
            <span>Refurbished, not new &mdash; grade disclosed on every product</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-5 w-5" />
            <span>Battery health 85% or better, guaranteed</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-5 w-5" />
            <span>30-day returns</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-5 w-5" />
            <span>No telco contract</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed" data-testid="footer-compliance">
            {complianceNote}
          </p>
          <p className="text-xs text-muted-foreground">
            Watch plans are sold for their home market only and do not roam
            across borders. Activating a plan for your destination country is
            the only way a watch stays connected while you travel.
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {brand.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}