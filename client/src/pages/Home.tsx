import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import { BlogCard } from "@/components/BlogCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Users,
  Bell,
  Shield,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Heart,
  Globe,
} from "lucide-react";
import { SiApple } from "react-icons/si";
import type { Product, BlogPost, Testimonial } from "@shared/schema";
import { useSeo } from "@/hooks/use-seo";
import { breadcrumbList } from "@/lib/structured-data";

import heroImage from "@assets/stock_images/apple_watch_gps_feature.png";
import safetyImage1 from "@assets/stock_images/apple_watch_silver.png";
import safetyImage2 from "@assets/stock_images/apple_watch_pink.png";
import safetyImage3 from "@assets/stock_images/apple_watch_space_gray.png";
import kidsImage1 from "@assets/stock_images/apple_watch_activity.png";
import kidsImage2 from "@assets/stock_images/apple_watch_cellular.png";
import watchImage from "@assets/stock_images/apple_watch_midnight.png";

const safetyFeatures = [
  {
    icon: MapPin,
    title: "GPS Tracking",
    description: "Real-time location tracking so you always know where your child is. Get instant updates on their whereabouts.",
    image: safetyImage1,
  },
  {
    icon: Users,
    title: "Safe Contacts",
    description: "Only pre-approved contacts can reach your child. You control who they can call and message.",
    image: safetyImage2,
  },
  {
    icon: Bell,
    title: "Geofencing Alerts",
    description: "Set safe zones and get notified instantly when your child enters or leaves designated areas.",
    image: safetyImage3,
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Choose Your Watch",
    description: "Select from our range of certified refurbished Apple SE watches in various grades and colors.",
    icon: Smartphone,
  },
  {
    step: 2,
    title: "Add Better Roaming",
    description: "Get seamless connectivity with our partner Better Roaming's kid-safe cellular plans.",
    icon: Globe,
  },
  {
    step: 3,
    title: "Set Up Safety",
    description: "Configure contacts, location sharing, and safety features through your iPhone.",
    icon: Shield,
  },
  {
    step: 4,
    title: "Stay Connected",
    description: "Enjoy peace of mind knowing your child is always just a tap away.",
    icon: Heart,
  },
];

export default function Home() {
  useSeo({
    title: "Buy Refurbished Apple Watch SE for Kids | GPS & Safety | KidWatch",
    description: "Shop certified refurbished Apple Watch SE from $99. GPS tracking, Emergency SOS, Family Setup & kid-safe cellular plans. 30-day guarantee & free shipping.",
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const featuredProducts = products?.slice(0, 3);
  const featuredPosts = posts?.slice(0, 3);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbList([{ name: "Home", path: "/" }]),
        }}
      />
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Apple Watch SE with GPS tracking for kids safety"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
          <div className="max-w-2xl space-y-6">
            <Badge className="bg-accent text-accent-foreground" data-testid="badge-hero">
              <Zap className="h-3 w-3 mr-1" />
              Certified Refurbished
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="text-hero-title">
              Buy Refurbished Apple Watch SE for Kids
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Certified refurbished Apple Watch SE from $99 with GPS tracking, Emergency SOS, and Family Setup. 
              Kid-safe cellular plans included. Free shipping and 30-day guarantee.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="text-base px-8" data-testid="button-shop-now">
                  Shop Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/safety">
                <Button size="lg" variant="outline" className="text-base px-8 bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20" data-testid="button-learn-safety">
                  Learn About Safety
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <SiApple className="h-8 w-8 text-foreground" />
              <span className="font-medium">Apple Certified</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-accent" />
              <span className="font-medium">30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              <span className="font-medium">Better Roaming Partner</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-secondary" />
              <span className="font-medium">Free Shipping</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-safety-features">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Safety First</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apple Watch SE Safety Features for Kids
            </h2>
            <p className="text-lg text-muted-foreground">
              Every feature is designed with your child's safety in mind. Stay connected without compromise.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="overflow-visible hover-elevate" data-testid={`card-feature-${index}`}>
                <CardContent className="p-0">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50" data-testid="section-how-it-works">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Simple Setup</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get your child connected in just a few easy steps.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => (
              <Card key={item.step} className="text-center hover-elevate" data-testid={`card-step-${item.step}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mx-auto">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-product-showcase">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={watchImage}
                  alt="Refurbished Apple Watch SE in Midnight - certified and tested"
                  className="w-full h-full object-cover"
                />
              </div>
              <Card className="absolute -bottom-6 -right-6 max-w-xs">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                    <Globe className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">Better Roaming</p>
                    <p className="text-sm text-muted-foreground">Kid-safe cellular plans</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Badge variant="outline">Product Spotlight</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Refurbished Apple Watch SE - Best Value for Families
              </h2>
              <p className="text-lg text-muted-foreground">
                Get Apple Watch quality at a fraction of the retail price. Every refurbished 
                Apple Watch SE is thoroughly tested, certified, and ready for your child's adventures. Save up to 65% compared to buying new.
              </p>
              <ul className="space-y-3">
                {[
                  "Water resistant for active play",
                  "Durable design for everyday use",
                  "Family Setup for iPhone management",
                  "GPS + Cellular connectivity",
                  "Emergency SOS features",
                  "Fun, kid-friendly watch faces",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/shop">
                <Button size="lg" className="mt-4" data-testid="button-browse-watches">
                  Browse Watches
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50" data-testid="section-featured-products">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="outline" className="mb-4">Shop</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Best-Selling Apple Watch SE Deals</h2>
            </div>
            <Link href="/shop">
              <Button variant="outline" data-testid="button-view-all-products">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          {productsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="aspect-square rounded-t-lg" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-testimonials">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4">Reviews</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by 10,000+ Parents
            </h2>
            <p className="text-lg text-muted-foreground">
              See what other families are saying about KidWatch.
            </p>
          </div>
          {testimonialsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Skeleton key={s} className="h-4 w-4 rounded" />
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-4/6" />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {testimonials?.map((testimonial) => (
                <Card key={testimonial.id} className="hover-elevate" data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3 pt-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={`${testimonial.avatarColor || "bg-primary"} text-white text-xs font-semibold`}>
                          {testimonial.initials || testimonial.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground" data-testid="section-for-kids">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-white/20 text-white border-white/30">For Kids</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Fun Meets Safety
              </h2>
              <p className="text-lg text-white/90">
                Kids love the fun watch faces, games, and the ability to call mom and dad. 
                Parents love the safety features and peace of mind.
              </p>
              <ul className="space-y-3">
                {[
                  "Colorful, fun watch faces",
                  "Activity tracking and rewards",
                  "Approved apps and games",
                  "Easy one-tap calling to parents",
                  "Emoji and voice messages",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src={kidsImage1}
                  alt="Apple Watch SE activity tracking and fitness features for kids"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden mt-8">
                <img
                  src={kidsImage2}
                  alt="Apple Watch SE cellular connectivity for family communication"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="section-blog-preview">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <Badge variant="outline" className="mb-4">Blog</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Latest Articles</h2>
            </div>
            <Link href="/blog">
              <Button variant="outline" data-testid="button-view-all-posts">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          {postsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="aspect-video rounded-t-lg" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts?.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Buy an Apple Watch SE for Your Child?
            </h2>
            <p className="text-lg text-muted-foreground">
              Shop certified refurbished Apple Watch SE from $99. GPS tracking, safety features, and free shipping on every order.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="text-base px-8" data-testid="button-cta-shop">
                  Shop Watches
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-base px-8" data-testid="button-cta-learn">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
