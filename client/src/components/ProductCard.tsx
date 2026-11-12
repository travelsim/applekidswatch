import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { useBrand } from "@/lib/brand";

import { ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const gradeColors: Record<string, string> = {
  excellent: "bg-accent text-accent-foreground",
  good: "bg-primary text-primary-foreground",
  fair: "bg-secondary text-secondary-foreground",
};

const gradeLabels: Record<string, string> = {
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
};

const OFFICIAL_URLS: Record<string, string> = {
  "GW-SPACETALK-KIDS-01": "https://spacetalk.co/products/spacetalk-adventurer-2-smartwatch-phone",
  "GW-GARMIN-KIDS-01": "https://www.garmin.com/en-AU/p/1815501/pn/010-03399-00/",
  "GW-PIXBEE-KIDS-01": "https://pixbee.com.au/products/pixbee-pro-kids-4g-smart-watch",
  "GW-IMOO-KIDS-01": "https://www.imoo.com/en/products/x10",
  "GW-SAFEOWL-KIDS-01": "https://safeowl.com/products/owly-1",
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const { formatPrice } = useBrand();
  const hasCompareAt = product.originalPrice > product.price;
  const officialUrl = OFFICIAL_URLS[product.sku ?? ""];

  return (
    <Card className="group overflow-visible hover-elevate" data-testid={`card-product-${product.id}`}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            className={`absolute top-3 right-3 ${gradeColors[product.grade]}`}
            data-testid={`badge-grade-${product.id}`}
          >
            {gradeLabels[product.grade]}
          </Badge>
          {!product.inStock && (
            <div className="absolute bottom-3 left-3 rounded-md bg-background/90 px-3 py-1 shadow-md">
              <span className="text-lg font-semibold">{product.price === 0 ? "Price TBC" : "Out of Stock"}</span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-base leading-tight line-clamp-2" data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {product.color} &middot; {product.storage}
            </p>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            {product.price === 0 ? (
              <span className="text-xl font-bold" data-testid={`text-product-price-${product.id}`}>Price TBC</span>
            ) : (
              <span className="text-xl font-bold" data-testid={`text-product-price-${product.id}`}>
                {formatPrice(product.price)}
              </span>
            )}
            {/* A plan or accessory has no new-hardware reference price, so a
                strike-through and a savings figure would be a fabricated claim. */}
            {hasCompareAt && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge variant="outline" className="text-xs">
                  Save {formatPrice(product.originalPrice - product.price)}
                </Badge>
              </>
            )}
          </div>
          <div className="flex gap-2 pt-2">
            {officialUrl ? (
              <a href={officialUrl} target="_blank" rel="nofollow noopener noreferrer" className="flex-1" data-testid={`link-official-${product.id}`}>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Official page
                </Button>
              </a>
            ) : (
              <Link href={`/product/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full" data-testid={`button-view-${product.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </Link>
            )}
            <Button
              onClick={() => addItem(product.id)}
              disabled={!product.inStock}
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
          {officialUrl ? null : product.price === 0 ? (
            <p className="text-xs text-muted-foreground">Independent comparison listing. Price TBC pending sourced listing. Check the comparison above.</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
