import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme";
import { useCart } from "@/lib/cart";
import { useBrand } from "@/lib/brand";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Watch, Menu, ShoppingCart, Sun, Moon } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/safety", label: "Safety" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const { brand, currency, setCurrency } = useBrand();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1" data-testid="link-home">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
              <Watch className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">{brand.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={location === link.href ? "secondary" : "ghost"}
                  className="text-sm font-medium"
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {brand.displayCurrencies.length > 1 && (
              <Select
                value={currency}
                onValueChange={(v) => setCurrency(v as typeof currency)}
              >
                <SelectTrigger
                  className="w-[104px]"
                  aria-label="Display currency"
                  data-testid="select-currency"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {brand.displayCurrencies.map((c) => (
                    <SelectItem
                      key={c}
                      value={c}
                      data-testid={`option-currency-${c}`}
                    >
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Link href="/cart">
              <Button size="icon" variant="ghost" className="relative" data-testid="button-cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    data-testid="badge-cart-count"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary">
                      <Watch className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">{brand.name}</span>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <Button
                          variant={location === link.href ? "secondary" : "ghost"}
                          className="w-full justify-start text-base"
                          onClick={() => setMobileOpen(false)}
                          data-testid={`mobile-link-${link.label.toLowerCase()}`}
                        >
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                  </nav>
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <span className="text-sm text-muted-foreground">
                      Refurbished, not new. No telco contract.
                    </span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
