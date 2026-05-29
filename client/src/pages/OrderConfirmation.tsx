import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ArrowLeft, Package, Mail, MapPin, Phone, CreditCard } from "lucide-react";
import type { Order } from "@shared/schema";
import { useSeo } from "@/hooks/use-seo";
import { breadcrumbList } from "@/lib/structured-data";

export default function OrderConfirmation() {
  const [, navigate] = useLocation();

  // Try both routes — /order/:id and /order/success/:sessionId
  const [, params] = useRoute("/order/:id");
  const [, sessionParams] = useRoute("/order/success/:sessionId");

  const orderId = params?.id;
  const sessionId = sessionParams?.sessionId;

  // If we came from Stripe redirect via /order/success/:sessionId,
  // resolve the order ID from the session and redirect
  const [resolvedOrderId, setResolvedOrderId] = useState<string | null>(orderId || null);

  // Handle Stripe session → order ID resolution
  useEffect(() => {
    if (sessionId && !orderId) {
      // First check sessionStorage for pendingOrderId (set by Checkout page)
      const pendingId = sessionStorage.getItem("pendingOrderId");
      if (pendingId) {
        sessionStorage.removeItem("pendingOrderId");
        navigate(`/order/${pendingId}`, { replace: true });
        return;
      }

      // Fallback: resolve via API
      fetch(`/api/orders/by-session/${sessionId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Not found");
          return res.json();
        })
        .then((order: Order) => {
          navigate(`/order/${order.id}`, { replace: true });
        })
        .catch(() => {
          // If resolution fails, keep showing loading state then error
          setResolvedOrderId(null);
        });
    }
  }, [sessionId, orderId, navigate]);

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/${resolvedOrderId}`],
    enabled: !!resolvedOrderId,
  });

  useSeo({
    title: order
      ? `Order Confirmed #${order.id.slice(0, 8)} | KidWatch`
      : "Order Confirmation | KidWatch",
    description: "Your Apple Watch SE order has been confirmed. Thank you for choosing KidWatch.",
  });

  if (sessionId && !orderId) {
    // Still resolving Stripe session
    return (
      <div className="min-h-[60vh] py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl space-y-6">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl space-y-6">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: breadcrumbList([
              { name: "Home", path: "/" },
            ]),
          }}
        />
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Order Not Found</h1>
          <p className="text-muted-foreground">We couldn't find an order with that ID.</p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  const orderItems = JSON.parse(order.items);
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      failed: "bg-red-100 text-red-800",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen py-8 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbList([
            { name: "Home", path: "/" },
            { name: "Cart", path: "/cart" },
            { name: "Checkout", path: "/checkout" },
            { name: "Order", path: order ? `/order/${order.id}` : "/order" },
          ]),
        }}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <div className="text-center space-y-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {order.status === "paid" ? "Payment Confirmed!" : "Order Confirmed!"}
          </h1>
          <p className="text-muted-foreground">
            {order.status === "paid"
              ? "Your payment has been processed successfully. You'll receive a confirmation email shortly."
              : "Thank you for your order. You'll receive a confirmation once payment is processed."}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order #{order.id.slice(0, 8)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment</span>
              <span className="flex items-center gap-1">
                <CreditCard className="h-3 w-3" />
                {order.status === "paid" ? "Paid via Card" : order.status === "pending" ? "Pending" : "Failed"}
              </span>
            </div>
            <Separator />

            <div>
              <h4 className="font-semibold mb-3">Items</h4>
              {orderItems.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-sm py-2">
                  <span className="text-muted-foreground">
                    {item.name} ({item.color}) x{item.quantity}
                  </span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-accent font-medium">
                {order.shipping === 0 ? "Free" : `$${order.shipping}`}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{order.customerEmail}</span>
            </div>
            {order.customerPhone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{order.customerPhone}</span>
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              <p>{order.customerName}</p>
              <p>{order.shippingAddress}</p>
              <p>{order.city}, {order.state} {order.zipCode}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Link href="/shop">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
