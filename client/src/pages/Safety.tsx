import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Users,
  Bell,
  Shield,
  Phone,
  Heart,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Globe,
  Lock,
  Eye,
} from "lucide-react";
import { SiApple } from "react-icons/si";
import { useSeo } from "@/hooks/use-seo";

import safetyHero from "@assets/stock_images/apple_watch_safety.png";
import safetyImage1 from "@assets/stock_images/apple_watch_silver.png";
import safetyImage2 from "@assets/stock_images/apple_watch_blue.png";
import safetyImage3 from "@assets/stock_images/apple_watch_space_gray.png";

const safetyFeatures = [
  {
    icon: MapPin,
    title: "Real-Time GPS Tracking",
    description: "Know exactly where your child is at any moment. View their location on a map from your iPhone, and get movement history to understand their daily patterns.",
    image: safetyImage1,
  },
  {
    icon: Users,
    title: "Approved Contacts Only",
    description: "Complete control over who can reach your child. Only pre-approved family members and friends can call or message your child's watch.",
    image: safetyImage2,
  },
  {
    icon: Bell,
    title: "Geofencing Alerts",
    description: "Create safe zones around home, school, and other trusted locations. Receive instant notifications when your child enters or leaves these areas.",
    image: safetyImage3,
  },
];

const additionalFeatures = [
  {
    icon: Phone,
    title: "Emergency SOS",
    description: "Press and hold the side button to call emergency services and alert your emergency contacts with location.",
  },
  {
    icon: Lock,
    title: "Schooltime Mode",
    description: "Limit features during school hours so kids can focus, while still allowing emergency calls.",
  },
  {
    icon: Eye,
    title: "Activity Monitoring",
    description: "Track your child's activity and encourage healthy movement with fun challenges.",
  },
  {
    icon: Heart,
    title: "Health Tracking",
    description: "Monitor heart rate and get alerted to unusual readings that may need attention.",
  },
  {
    icon: Smartphone,
    title: "Family Setup",
    description: "Manage your child's watch directly from your iPhone using Apple's Family Setup feature.",
  },
  {
    icon: Globe,
    title: "Better Roaming",
    description: "Kid-safe cellular plans designed specifically for children's watches with parental controls.",
  },
];

export default function Safety() {
  useSeo({
    title: "Apple Watch SE Safety Features for Kids | GPS, SOS & Parental Controls | KidWatch",
    description: "Discover how Apple Watch SE keeps your child safe with real-time GPS tracking, Emergency SOS, approved contacts, geofencing alerts & School Time mode.",
  });

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={safetyHero}
            alt="Apple Watch SE Emergency SOS and safety features for children"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
          <div className="max-w-2xl space-y-6">
            <Badge className="bg-accent text-accent-foreground" data-testid="badge-safety-hero">
              <Shield className="h-3 w-3 mr-1" />
              Safety First
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="text-safety-title">
              Your Child's Safety is Our Priority
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Every feature of the Apple Watch SE is designed with your child's safety in mind. 
              Combined with Better Roaming's kid-safe cellular plans, you get complete peace of mind.
            </p>
            <Link href="/shop">
              <Button size="lg" className="text-base px-8 mt-4" data-testid="button-safety-shop">
                Shop Safe Watches
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <SiApple className="h-8 w-8 text-foreground" />
              <span className="font-medium">Apple Technology</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-accent" />
              <span className="font-medium">Parental Controls</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              <span className="font-medium">Better Roaming</span>
            </div>
            <div className="flex items-center gap-3">
              <Lock className="h-8 w-8 text-secondary" />
              <span className="font-medium">End-to-End Encrypted</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-core-features">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Core Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Safety Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground">
              Three essential features that work together to keep your child safe.
            </p>
          </div>

          <div className="space-y-16">
            {safetyFeatures.map((feature, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-video rounded-2xl overflow-hidden bg-muted">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Works with iPhone Family Setup",
                      "No technical expertise needed",
                      "Updates in real-time",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50" data-testid="section-additional-features">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">More Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional Safety Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Beyond the core features, Apple Watch SE offers even more ways to keep your child safe.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-feature-${index}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
                Better Roaming
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Kid-Safe Cellular Plans
              </h2>
              <p className="text-lg text-white/90">
                Our partnership with Better Roaming means your child's watch comes with 
                cellular connectivity designed specifically for kids. Parents have complete 
                control over data usage, calling, and messaging.
              </p>
              <ul className="space-y-3">
                {[
                  "Affordable monthly plans for families",
                  "Parental controls built-in",
                  "No contracts or hidden fees",
                  "Coverage across major networks",
                  "Easy setup and management",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-8 text-center space-y-4">
                  <Globe className="h-16 w-16 mx-auto" />
                  <h3 className="text-2xl font-bold">Better Roaming</h3>
                  <p className="text-white/80">
                    Kid-safe cellular plans starting at just $10/month
                  </p>
                  <div className="text-4xl font-bold">$10<span className="text-lg">/mo</span></div>
                  <Button variant="secondary" size="lg" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Keep Your Child Safe?
            </h2>
            <p className="text-lg text-muted-foreground">
              Browse our collection of certified refurbished Apple SE watches. 
              Every watch comes with our 30-day guarantee.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="text-base px-8" data-testid="button-safety-cta-shop">
                  Shop Watches
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-safety-cta-blog">
                  Read Safety Tips
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
