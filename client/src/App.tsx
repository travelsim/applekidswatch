import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { CartProvider } from "@/lib/cart";
import { BrandProvider } from "@/lib/brand";
import { useAnalytics } from "@/hooks/use-analytics";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Safety from "@/pages/Safety";
import About from "@/pages/About";
import Connectivity from "@/pages/Connectivity";
import {
  LegalPage,
  EligibilityPage,
  NoTelstraPage,
  SetupPage,
  ContactPage,
} from "@/pages/ContentPages";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/order/:id" component={OrderConfirmation} />
      <Route path="/order/success/:sessionId" component={OrderConfirmation} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/safety" component={Safety} />
      <Route path="/about" component={About} />
      <Route path="/connectivity" component={Connectivity} />
      <Route path="/is-it-right-for-my-child" component={EligibilityPage} />
      <Route path="/why-no-telstra" component={NoTelstraPage} />
      <Route path="/setup" component={SetupPage} />
      <Route path="/legal" component={LegalPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AnalyticsTracker() {
  useAnalytics();
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrandProvider>
        <CartProvider>
          <TooltipProvider>
            <AnalyticsTracker />
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </CartProvider>
        </BrandProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
