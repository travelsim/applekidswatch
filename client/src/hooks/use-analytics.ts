import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

export function useAnalytics() {
  const [location] = useLocation();
  const lastPath = useRef("");

  useEffect(() => {
    // Only track on actual path changes, not initial render
    if (lastPath.current && lastPath.current !== location) {
      // Fire-and-forget — never block rendering
      fetch("/api/analytics/pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: location,
          referrer: document.referrer || null,
        }),
        // Keepalive ensures the request completes even during navigation
        keepalive: true,
      }).catch(() => {
        // Silently ignore analytics failures
      });
    }
    lastPath.current = location;
  }, [location]);
}
