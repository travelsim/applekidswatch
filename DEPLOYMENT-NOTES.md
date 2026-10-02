# Four-brand storefront — deployment notes

One codebase, one Vercel project, one database, four brands.
Brand is resolved from the request `Host` header.

| Brand | Domain | Market | Base currency |
| :--- | :--- | :--- | :--- |
| AU flagship | `applekidswatch.com` | AU | AUD |
| International kids | `applekidswat.ch` | UK / EU | EUR (GBP, CHF display) |
| Umbrella | `applewat.ch` | UK / EU | EUR (GBP, CHF display) |
| Travel | `travelwat.ch` | Worldwide | EUR (GBP, CHF, AUD, USD display) |

## DNS records required at the registrar — owner applies these, we do not

Vercel requires an `A` record for **every** hostname, apex and `www` alike.
Do not substitute a CNAME for the `www` rows.

| Host | Type | Value | TTL |
| :--- | :--- | :--- | :--- |
| `applekidswatch.com` | A | `76.76.21.21` | 300 |
| `www.applekidswatch.com` | A | `76.76.21.21` | 300 |
| `applewat.ch` | A | `76.76.21.21` | 300 |
| `www.applewat.ch` | A | `76.76.21.21` | 300 |
| `applekidswat.ch` | A | `76.76.21.21` | 300 |
| `www.applekidswat.ch` | A | `76.76.21.21` | 300 |
| `travelwat.ch` | A | `76.76.21.21` | 300 |
| `www.travelwat.ch` | A | `76.76.21.21` | 300 |

The `.ch` zones are delegated to Dynadot (`ns1.dan.com` / `ns2.dan.com`).

### DO NOT TOUCH

Purelymail `MX`, `SPF`, `DKIM` and ownership `TXT` records in every zone.
Only the eight `A` rows above are in scope.

## Test a brand before its DNS exists

```bash
curl -s -H "Host: applewat.ch" https://applekidswatch.com/api/brands/current
curl -s -H "Host: travelwat.ch" https://applekidswatch.com/api/products | head -c 400
```

## Schema

The four-brand migration (`brands` table plus the `brand_id`, `sku`,
`category`, `plan_type`, `plan_term`, `market`, `compare_at_price`, `badge`
and `sort_order` columns) is forward-only and idempotent, and is applied by
the application at cold start from `server/db.ts`. The same statements are
kept in `server/migrations/0001_four_brand.sql` for a manual, reviewable run.

The launch catalogue seeds once, guarded on the `brands` table being empty.
It never touches orders, and it never seeds testimonials.

## Catalogue constraint that must survive future edits

BetterRoaming watch plans work in their **home market only** and do not roam
across borders. Every plan SKU carries that clause in its description. Do not
remove it, and do not publish a Swiss-local plan — Switzerland is not a
supported Family Setup market.
