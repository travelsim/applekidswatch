import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Shield, Truck, RefreshCw } from "lucide-react";
import { SiApple } from "react-icons/si";
import { useState, useMemo } from "react";
import type { Product } from "@shared/schema";
import { useSeo } from "@/hooks/use-seo";
import { breadcrumbList } from "@/lib/structured-data";

export default function Shop() {
  useSeo({
    title: "Shop Refurbished Apple Watch SE for Kids | From $99 | KidWatch",
    description: "Browse certified refurbished Apple Watch SE models with GPS + Cellular. Excellent, good & fair conditions available. Free shipping, 30-day guarantee. Buy now.",
  });

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = [...products];

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.color.toLowerCase().includes(searchLower)
      );
    }

    if (gradeFilter !== "all") {
      filtered = filtered.filter((p) => p.grade === gradeFilter);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, search, gradeFilter, sortBy]);

  const itemListJsonLd = products
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": products.map((product, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://kidwatch.com/product/${product.id}`,
          "name": `${product.name} - ${product.color}`,
          "image": product.image,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "USD",
            "availability": product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        })),
      }
    : null;

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
          ]),
        }}
      />
      {itemListJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4">Shop</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" data-testid="text-shop-title">
              Buy Refurbished Apple Watch SE - From $99
            </h1>
            <p className="text-lg text-muted-foreground">
              Shop certified refurbished Apple Watch SE with GPS + Cellular and Family Setup. 
              Every watch is thoroughly tested and comes with free shipping and a 30-day money-back guarantee.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-sm">
              <SiApple className="h-5 w-5" />
              <span>Apple Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-5 w-5 text-accent" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RefreshCw className="h-5 w-5 text-secondary" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search watches..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
            <div className="flex gap-4">
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="w-40" data-testid="select-grade">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No watches found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setGradeFilter("all");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? "watch" : "watches"}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
