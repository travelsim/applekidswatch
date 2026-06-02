import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Shield,
  Leaf,
  Award,
  Globe,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { SiApple } from "react-icons/si";
import { useSeo } from "@/hooks/use-seo";
import { breadcrumbList, faqPage } from "@/lib/structured-data";

import aboutHero from "@assets/stock_images/apple_watch_cellular.png";
import watchImage from "@assets/stock_images/apple_watch_starlight.png";

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description: "Every decision we make puts your child's safety at the forefront. From product selection to features, safety is non-negotiable.",
  },
  {
    icon: Heart,
    title: "Family Focus",
    description: "We understand the challenges of modern parenting. Our products are designed to bring families closer together.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "By selling refurbished watches, we're extending the life of quality electronics and reducing e-waste.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Every watch is thoroughly tested and certified. We stand behind our products with a 30-day guarantee.",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Families" },
  { value: "99.8%", label: "Satisfaction Rate" },
  { value: "30 Days", label: "Money Back Guarantee" },
  { value: "24/7", label: "Customer Support" },
];

export default function About() {
  useSeo({
    title: "About KidWatch | Certified Refurbished Apple Watch SE for Kids",
    description: "KidWatch provides certified refurbished Apple Watch SE for children. Quality guaranteed, eco-friendly, and affordable. 10,000+ happy families trust us.",
  });

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbList([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: faqPage([
            {
              question: "What does \"refurbished\" mean?",
              answer: "Our refurbished watches are pre-owned devices that have been professionally restored to like-new condition and thoroughly tested.",
            },
            {
              question: "How does the guarantee work?",
              answer: "You have 30 days to return your watch for a full refund if you're not satisfied.",
            },
            {
              question: "Do I need an iPhone?",
              answer: "Yes, setting up an Apple Watch SE for a child requires an iPhone with the Family Setup feature (iPhone 6s or later).",
            },
          ]),
        }}
      />
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            alt="Happy family together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
          <div className="max-w-2xl space-y-6">
            <Badge className="bg-accent text-accent-foreground" data-testid="badge-about-hero">
              <Heart className="h-3 w-3 mr-1" />
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="text-about-title">
              Keeping Families Connected
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              KidWatch was born from a simple idea: every child deserves to stay connected 
              with their family, safely. We combine quality refurbished Apple watches with 
              Better Roaming's kid-safe cellular plans.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-mission">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Making Safety Affordable for Every Family
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that child safety shouldn't come with a premium price tag. 
                By offering certified refurbished Apple SE watches at accessible prices, 
                we're making it possible for more families to stay connected.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our partnership with Better Roaming ensures that every watch comes with 
                kid-safe cellular connectivity, giving parents complete peace of mind 
                while their children enjoy the freedom to explore.
              </p>
              <ul className="space-y-3">
                {[
                  "Certified refurbished Apple quality",
                  "Rigorous testing and quality control",
                  "Affordable pricing without compromise",
                  "Kid-safe Better Roaming connectivity",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={watchImage}
                  alt="Apple Watch SE"
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="absolute -bottom-6 -left-6 max-w-xs">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <SiApple className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Apple Certified</p>
                    <p className="text-sm text-muted-foreground">Genuine refurbished</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50" data-testid="section-values">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground">
              Our core values guide everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-value-${index}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30">
                <Globe className="h-3 w-3 mr-1" />
                Our Partner
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Powered by Better Roaming
              </h2>
              <p className="text-lg text-white/90">
                Better Roaming is our trusted partner for cellular connectivity. Their kid-safe 
                plans are designed specifically for children's devices, with built-in parental 
                controls and transparent pricing.
              </p>
              <ul className="space-y-3">
                {[
                  "Specialized kids' cellular plans",
                  "Parental controls included",
                  "No hidden fees or contracts",
                  "Nationwide coverage",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/10 mb-6">
                <Globe className="h-16 w-16" />
              </div>
              <h3 className="text-2xl font-bold">Better Roaming</h3>
              <p className="text-white/80 mt-2">Kid-Safe Connectivity Partner</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-contact">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Badge variant="outline">Contact Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                We're Here to Help
              </h2>
              <p className="text-lg text-muted-foreground">
                Have questions about our products or need help with your order? 
                Our friendly team is here to assist you.
              </p>
              <div className="space-y-4">
                <a href="mailto:hello@kidwatch.com" className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-sm text-muted-foreground">hello@kidwatch.com</p>
                  </div>
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-sm text-muted-foreground">(123) 456-7890</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Visit Us</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-8 space-y-6">
                <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">What does "refurbished" mean?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our refurbished watches are pre-owned devices that have been professionally 
                      restored to like-new condition and thoroughly tested.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">How does the guarantee work?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You have 30 days to return your watch for a full refund if you're not satisfied.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Do I need an iPhone?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Yes, setting up an Apple Watch SE for a child requires an iPhone 
                      with the Family Setup feature (iPhone 6s or later).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse our collection of certified refurbished Apple SE watches and keep your family connected.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="text-base px-8" data-testid="button-about-cta-shop">
                  Shop Watches
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/safety">
                <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-about-cta-safety">
                  Learn About Safety
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
