import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
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

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

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
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-lg font-semibold">Out of Stock</span>
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
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold" data-testid={`text-product-price-${product.id}`}>
              ${product.price}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
            <Badge variant="outline" className="text-xs">
              Save ${product.originalPrice - product.price}
            </Badge>
          </div>
          <div className="flex gap-2 pt-2">
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button variant="outline" className="w-full" data-testid={`button-view-${product.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </Link>
            <Button
              onClick={() => addItem(product.id)}
              disabled={!product.inStock}
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
