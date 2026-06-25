import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Shield, Truck, Lock, CheckCircle, CreditCard } from "lucide-react";
import type { Product } from "@shared/schema";
import { useSeo } from "@/hooks/use-seo";
import { breadcrumbList } from "@/lib/structured-data";

export default function Checkout() {
  const [, _navigate] = useLocation();
  const { items, getTotal, clearCart } = useCart();
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  useSeo({
    title: "Checkout | KidWatch - Refurbished Apple Watch SE",
    description: "Complete your order for a certified refurbished Apple Watch SE for your child.",
  });

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const cartProducts = items
    .map((item) => {
      const product = products?.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const subtotal = products ? getTotal(products) : 0;
  const shipping = 0;
  const total = subtotal + shipping;

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate
    if (!form.customerName || !form.customerEmail || !form.shippingAddress || !form.city || !form.state || !form.zipCode) {
      setError("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const orderItems = items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const res = await apiRequest("POST", "/api/create-checkout-session", {
        items: orderItems,
        customer: {
          name: form.customerName,
          email: form.customerEmail,
          phone: form.customerPhone,
          address: {
            line1: form.shippingAddress,
            city: form.city,
            state: form.state,
            zip: form.zipCode,
          },
        },
      });

      const data = await res.json();

      if (data.url) {
        // Store order ID so OrderConfirmation can find it after Stripe redirect
        if (data.orderId) {
          sessionStorage.setItem("pendingOrderId", data.orderId);
        }
        clearCart();
        // Redirect to Stripe Checkout hosted page
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to initiate payment");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbList([
              { name: "Home", path: "/" },
              { name: "Cart", path: "/cart" },
              { name: "Checkout", path: "/checkout" },
            ]),
          }}
        />
        <div className="text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-accent mx-auto" />
          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">Add some products to your cart before checking out.</p>
          <Link href="/shop">
            <Button>Browse Products</Button>
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
            { name: "Checkout", path: "/checkout" },
          ]),
        }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        value={form.customerName}
                        onChange={(e) => updateField("customerName", e.target.value)}
                        placeholder="Jane Smith"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerEmail">Email *</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={form.customerEmail}
                        onChange={(e) => updateField("customerEmail", e.target.value)}
                        placeholder="jane@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone (optional)</Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      value={form.customerPhone}
                      onChange={(e) => updateField("customerPhone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shippingAddress">Shipping Address *</Label>
                    <Input
                      id="shippingAddress"
                      value={form.shippingAddress}
                      onChange={(e) => updateField("shippingAddress", e.target.value)}
                      placeholder="123 Main Street, Apt 4B"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={form.state}
                        onChange={(e) => updateField("state", e.target.value)}
                        placeholder="NY"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={form.zipCode}
                        onChange={(e) => updateField("zipCode", e.target.value)}
                        placeholder="10001"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full lg:hidden"
                disabled={submitting}
              >
                {submitting ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay with Card — ${total}
                  </>
                )}
              </Button>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartProducts.map((product) => (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate mr-2">
                        {product.name} ({product.color}) x{product.quantity}
                      </span>
                      <span>${product.price * product.quantity}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-accent font-medium">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full hidden lg:flex"
                    disabled={submitting}
                  >
                    {submitting ? (
                      "Processing..."
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay with Card — ${total}
                      </>
                    )}
                  </Button>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-accent" />
                      <span>30-Day Money Back Guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="h-4 w-4 text-primary" />
                      <span>Free Shipping on All Orders</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Secure Checkout via Stripe</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
