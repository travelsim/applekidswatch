import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Shield, Truck } from "lucide-react";
import type { Product } from "@shared/schema";
import { useSeo } from "@/hooks/use-seo";
import { breadcrumbList } from "@/lib/structured-data";

export default function Cart() {
  useSeo({
    title: "Your Cart | KidWatch - Refurbished Apple Watch SE",
    description: "Review your Apple Watch SE order. Free shipping on all orders, 30-day money-back guarantee.",
  });

  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCart();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const cartProducts = items
    .map((item) => {
      const product = products?.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const subtotal = products ? getTotal(products) : 0;
  const shipping = 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbList([
              { name: "Home", path: "/" },
              { name: "Cart", path: "/cart" },
            ]),
          }}
        />
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">
            Browse our collection of refurbished Apple SE watches.
          </p>
          <Link href="/shop">
            <Button className="mt-4" data-testid="button-start-shopping">
              Start Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Cart", path: "/cart" },
          ]),
        }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-8" data-testid="text-cart-title">
          Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map((product) => (
              <Card key={product.id} data-testid={`card-cart-item-${product.id}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link href={`/product/${product.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors" data-testid={`text-cart-item-name-${product.id}`}>
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {product.color} &middot; {product.storage}
                          </p>
                        </div>
                        <p className="font-bold text-lg" data-testid={`text-cart-item-total-${product.id}`}>
                          ${product.price * product.quantity}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                            data-testid={`button-decrease-${product.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={product.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (val > 0) updateQuantity(product.id, val);
                            }}
                            className="w-16 text-center"
                            min={1}
                            data-testid={`input-quantity-${product.id}`}
                          />
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(product.id, product.quantity + 1)}
                            data-testid={`button-increase-${product.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => removeItem(product.id)}
                          data-testid={`button-remove-${product.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between pt-4">
              <Link href="/shop">
                <Button variant="outline" data-testid="button-continue-shopping">
                  Continue Shopping
                </Button>
              </Link>
              <Button variant="ghost" onClick={clearCart} data-testid="button-clear-cart">
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-accent font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span data-testid="text-total">${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full" data-testid="button-checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-accent" />
                    <span>30-Day Money Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Free Shipping on All Orders</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
