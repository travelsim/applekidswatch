# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly:

- **Email**: security@travelsim.org (or project maintainer)
- **GitHub**: Use the "Report a security vulnerability" feature if available, or open a private issue.
- Include detailed steps to reproduce, affected versions, and any PoC.

We will acknowledge receipt within 48 hours and aim to release fixes promptly. Do not disclose publicly until we have a fix.

## Security Features & Best Practices

### Secrets Management
- All secrets (API keys, DB credentials, session secrets) **MUST** be stored in `.env` files.
- `.env` is gitignored and **never committed**.
- Use `.env.example` as template (no real values).
- Rotate keys regularly. Use environment variables in production (Render, Railway, Vercel, etc.).
- Never expose secrets in client-side code. Use `VITE_` prefix only for public config (e.g. maps keys that must be client-side).

### Input Validation
- All user input and route parameters are validated using **Zod** schemas.
- Prefer `schema.parse()` or safeParse before processing.
- Reject invalid input early with 400 ValidationError.

### Error Handling
- Catch clauses always use `catch (error: unknown)`.
- Use `getErrorMessage(error)` for safe user-facing messages.
- **Never** send raw stack traces or full error objects to clients in production.
- Centralized Express error middleware strips sensitive info.
- Client-side errors are handled gracefully with user-friendly toasts/messages.

### Threat Model (High Level)
- **Injection**: Mitigated by Zod + parameterized queries (Drizzle ORM).
- **Broken Auth**: Session secrets, CORS strict in prod.
- **Sensitive Data Exposure**: No PII in logs; env vars protected.
- **API Abuse**: Rate limiting recommended for public endpoints (future enhancement).
- **Supply Chain**: Dependabot / renovate enabled; audit with `pnpm audit` or `npm audit`.
- **Client-side**: Vite only exposes `VITE_*` vars; no accidental leaks.

### Dependencies & Updates
- Keep dependencies up to date.
- Run security audits before deploys.
- Pin critical versions where possible.

### Production Hardening
- CORS restricted to known origins.
- No debug endpoints in prod.
- Error responses are minimal (`{ error: "..." }`).
- HTTPS enforced at edge (Cloudflare/Render).

## Out of Scope
- Physical security
- Social engineering (user education separate)
- Third-party service uptime (Aviationstack, SerpApi, etc.)

## Questions?
Open a GitHub issue or contact the maintainer.

---
*This policy applies to all travelsim TypeScript projects. Customize per-project as needed.*
