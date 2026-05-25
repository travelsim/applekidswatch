import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Watch, Mail, Phone, MapPin, Shield, Truck, RefreshCw, Loader2 } from "lucide-react";
import { SiApple, SiFacebook, SiInstagram, SiX } from "react-icons/si";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You'll receive updates on kids' safety and new products.",
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
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
                <Watch className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">KidWatch</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Keeping families connected with refurbished Apple SE watches and Better Roaming connectivity. Safety and value, combined.
            </p>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="ghost" data-testid="link-facebook">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="link-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="link-twitter">
                <SiX className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-shop">
                Shop Watches
              </Link>
              <Link href="/safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-safety">
                Safety Features
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-blog">
                Blog & Guides
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="footer-link-about">
                About Us
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@kidwatch.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                hello@kidwatch.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
                (123) 456-7890
              </a>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Get safety tips and exclusive offers for your family.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
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

        <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SiApple className="h-5 w-5" />
            <span>Apple Certified Refurbished</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-5 w-5" />
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-5 w-5" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-5 w-5" />
            <span>Easy Returns</span>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} KidWatch. All rights reserved. Powered by Better Roaming.
          </p>
        </div>
      </div>
    </footer>
  );
}
