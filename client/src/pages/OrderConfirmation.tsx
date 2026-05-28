import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ArrowLeft, Package, Mail, MapPin, Phone } from "lucide-react";
import type { Order } from "@shared/schema";
import { useSeo } from "@/hooks/use-seo";

export default function OrderConfirmation() {
  const [, params] = useRoute("/order/:id");
  const orderId = params?.id;

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/${orderId}`],
    enabled: !!orderId,
  });

  useSeo({
    title: order
      ? `Order Confirmed #${order.id.slice(0, 8)} | KidWatch`
      : "Order Confirmation | KidWatch",
    description: "Your Apple Watch SE order has been confirmed. Thank you for choosing KidWatch.",
  });

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

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <div className="text-center space-y-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. You'll receive a confirmation email shortly.
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
              <span className="text-accent font-medium capitalize">{order.status}</span>
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
