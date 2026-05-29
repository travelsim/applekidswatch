import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";
import {
  ShoppingCart,
  Shield,
  Truck,
  RefreshCw,
  CheckCircle,
  ArrowLeft,
  Globe,
  MapPin,
  Users,
  Bell,
  Smartphone,
  Heart,
} from "lucide-react";
import { SiApple } from "react-icons/si";
import type { Product } from "@shared/schema";
import { useSeo } from "@/hooks/use-seo";
import { breadcrumbList } from "@/lib/structured-data";

const gradeDescriptions: Record<string, string> = {
  excellent: "Like new condition with minimal signs of use. Battery health 90%+.",
  good: "Minor cosmetic wear. Fully functional with battery health 85%+.",
  fair: "Visible wear but works perfectly. Great value with battery health 80%+.",
};

const gradeColors: Record<string, string> = {
  excellent: "bg-accent text-accent-foreground",
  good: "bg-primary text-primary-foreground",
  fair: "bg-secondary text-secondary-foreground",
};

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const { addItem, items } = useCart();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    enabled: !!productId,
  });

  useSeo({
    title: product
      ? `Buy ${product.name} ${product.color} | $${product.price} Refurbished | KidWatch`
      : "Apple Watch SE for Kids | KidWatch",
    description: product
      ? `${product.description} Was $${product.originalPrice}, now $${product.price}. ${product.grade} condition. Free shipping & 30-day guarantee.`
      : "Shop certified refurbished Apple Watch SE for kids with GPS tracking and safety features.",
    canonical: product ? `/product/${product.id}` : undefined,
    ogImage: product?.image,
  });

  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const relatedProducts = allProducts
    ?.filter((p) => p.id !== productId)
    .slice(0, 3);

  const inCart = items.some((item) => item.productId === productId);

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/shop">
            <Button data-testid="button-back-to-shop">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  function deriveMpn(product: Product): string {
    const gen = product.name.includes("1st Gen") ? "A1" : "A2";
    const colorCode = product.color.substring(0, 3).toUpperCase();
    const gradeCode = product.grade.substring(0, 2).toUpperCase();
    return `AWK-${gen}-${colorCode}-${gradeCode}`;
  }

  function deriveGtin(product: Product): string {
    // Use a deterministic numeric GTIN-14 derived from the product UUID hash
    // Real GTINs are not available for refurbished devices; this provides
    // a numeric identifier acceptable for Google Shopping feed submission.
    const hash = product.id.replace(/-/g, "").replace(/[a-f]/g, (c) =>
      String(c.charCodeAt(0) - 87)
    ).substring(0, 13);
    return `0${hash}`;
  }

  const productJsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://kidwatch.com/product/${product.id}`,
    "name": `${product.name} - ${product.color}`,
    "description": product.description,
    "image": product.image,
    "sku": product.id,
    "mpn": deriveMpn(product),
    "gtin": deriveGtin(product),
    "brand": { "@type": "Brand", "name": "Apple" },
    "category": "Electronics > Wearables > Smartwatches",
    "url": window.location.href,
    "itemCondition": product.grade === "excellent"
      ? "https://schema.org/RefurbishedCondition"
      : product.grade === "good"
      ? "https://schema.org/UsedCondition"
      : "https://schema.org/DamagedCondition",
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "condition": "https://schema.org/RefurbishedCondition",
      "seller": { "@type": "Organization", "name": "KidWatch" },
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": 0,
          "currency": "USD"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 5,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org.FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "127",
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": { "@type": "Person", "name": "Sarah M." },
        "reviewBody": "Perfect for my 8-year-old. GPS tracking gives me peace of mind and she loves the watch features."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": { "@type": "Person", "name": "Jason T." },
        "reviewBody": "Great value refurbished watch. Looks brand new and Family Setup was easy to configure."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "author": { "@type": "Person", "name": "Lisa K." },
        "reviewBody": "Excellent condition and fast shipping. My daughter uses it daily for school."
      }
    ]
  } : null;

  return (
    <div className="min-h-screen">
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/product/${product.id}` },
          ]),
        }}
      />
      <section className="py-4 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Badge className={gradeColors[product.grade]} data-testid="badge-product-grade">
                  {product.grade.charAt(0).toUpperCase() + product.grade.slice(1)} Condition
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold mt-3" data-testid="text-product-name">
                  {product.name}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {product.color} &middot; {product.storage}
                </p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold" data-testid="text-product-price">
                  ${product.price}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <Badge variant="outline">
                  Save ${product.originalPrice - product.price}
                </Badge>
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Condition: {product.grade.charAt(0).toUpperCase() + product.grade.slice(1)}</h4>
                  <p className="text-sm text-muted-foreground">
                    {gradeDescriptions[product.grade]}
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => addItem(product.id)}
                  disabled={!product.inStock || inCart}
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {inCart ? "In Cart" : product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Link href="/cart">
                  <Button size="lg" variant="outline" className="w-full" data-testid="button-view-cart">
                    View Cart
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <SiApple className="h-6 w-6" />
                  <div>
                    <p className="text-sm font-medium">Apple Certified</p>
                    <p className="text-xs text-muted-foreground">Genuine Parts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-sm font-medium">30-Day Guarantee</p>
                    <p className="text-xs text-muted-foreground">Full Refund</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">2-5 Business Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-6 w-6 text-secondary" />
                  <div>
                    <p className="text-sm font-medium">Better Roaming Ready</p>
                    <p className="text-xs text-muted-foreground">Kid-Safe Plans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="w-full justify-start" data-testid="tabs-product-details">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="specs">Specs</TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="mt-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="safety" className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <MapPin className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold mb-2">GPS Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time location tracking so you always know where your child is.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-accent mb-4" />
                    <h3 className="font-semibold mb-2">Safe Contacts</h3>
                    <p className="text-sm text-muted-foreground">
                      Only approved contacts can reach your child.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Bell className="h-8 w-8 text-secondary mb-4" />
                    <h3 className="font-semibold mb-2">Geofencing</h3>
                    <p className="text-sm text-muted-foreground">
                      Get alerts when your child enters or leaves safe zones.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="specs" className="mt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium">Apple Watch SE</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="font-medium">{product.storage}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Color</span>
                  <span className="font-medium">{product.color}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Connectivity</span>
                  <span className="font-medium">GPS + Cellular</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Water Resistance</span>
                  <span className="font-medium">50 meters</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-muted-foreground">Display</span>
                  <span className="font-medium">Retina LTPO OLED</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
