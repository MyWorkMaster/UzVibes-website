# Phase Website 1.9 Security QA Notes

## Public routes confirmed

- `https://uzvibes.com/`
- `https://uzvibes.com/privacy`
- `https://uzvibes.com/terms`
- `https://uzvibes.com/sitemap.xml`
- `https://uzvibes.com/robots.txt`
- `https://uzvibes.com/site.webmanifest`

The Django legal API remains separate from the public sitemap. The Django admin path is not documented here, not linked from the frontend, and not included in public static assets.

## Security header recommendations

Recommended production headers for the static frontend:

```nginx
add_header Strict-Transport-Security "max-age=31536000" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Frame-Options "DENY" always;
add_header Permissions-Policy "accelerometer=(), autoplay=(), camera=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()" always;
```

Notes:

- HSTS should remain enabled only while HTTPS is stable for the full site.
- `X-Frame-Options: DENY` is appropriate because the marketing site is not intended to be embedded.
- The restrictive `Permissions-Policy` is appropriate because the public site does not need device permissions.
- These headers should be applied to static frontend responses and inherited by normal public routes where possible.

Production status on April 28, 2026:

- Public static routes return `Strict-Transport-Security`.
- Public static routes return `X-Content-Type-Options: nosniff`.
- Public static routes return `Referrer-Policy: strict-origin-when-cross-origin`.
- Public static routes return `X-Frame-Options: DENY`.
- Public static routes return the restrictive `Permissions-Policy` above.
- CSP is documented as a candidate only and is not enforced yet.

## Candidate CSP

Do not enforce Content Security Policy without a browser QA pass. The current Vite app and JSON-LD metadata should be tested before turning CSP on.

Candidate starting point:

```nginx
add_header Content-Security-Policy "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://uzvibes.com; font-src 'self' data:;" always;
```

This is intentionally marked as a candidate, not a committed enforcement requirement. Tighten it after confirming the built Vite bundle, JSON-LD, legal CMS fetches, social preview assets, and any future third-party services still work.

## Legal API and admin indexing strategy

- Public landing pages can be indexed.
- `/robots.txt` allows public pages and points to `/sitemap.xml`.
- `/sitemap.xml` includes only `/`, `/privacy`, and `/terms`.
- Legal API responses should include `X-Robots-Tag: noindex`.
- Django admin responses should include `X-Robots-Tag: noindex, nofollow, noarchive`.
- `/admin/` should continue returning 404 in production.
- Robots files are not a security boundary; admin protection must remain enforced through nginx routing and Django authentication.

Production status on April 28, 2026:

- Legal API GET responses return `X-Robots-Tag: noindex`.
- `/admin/` returns 404.
- The protected Django admin path remains intentionally omitted from this repository.

## Public QA checklist

Homepage:

- [x] Hero loads correctly.
- [x] Header logo references `/website-logo.png`.
- [x] Favicon references `/website-favicon.png`.
- [x] App Store CTA still uses `#app-store`.
- [x] Google Play CTA still uses `#google-play`.
- [x] CTA copy says Coming Soon.
- [x] Contact link uses `mailto:contact@uzvibes.com`.
- [x] Header anchors target public homepage sections.
- [x] Skip link targets `#main-content`.
- [x] No `console.*` calls were found in frontend source.

Legal pages:

- [x] Footer Privacy link points to `/privacy`.
- [x] Footer Terms link points to `/terms`.
- [x] Contact footer link points to the homepage contact anchor when needed.
- [x] Legal pages can fetch from the configured legal API.
- [x] Legal pages have fallback placeholder behavior if the API is unavailable.
- [x] No app-user auth, dashboard, analytics, or service worker was added.

Static SEO assets:

- [x] `/sitemap.xml` exists and lists only public website pages.
- [x] `/robots.txt` exists and does not expose admin paths.
- [x] `/site.webmanifest` exists and references the production favicon asset.
- [x] `/og-image.svg` exists and is referenced by Open Graph and Twitter/X metadata.
- [x] `/website-favicon.png` exists.
- [x] `/website-logo.png` exists.

Security/admin:

- [x] `/admin/` should return 404 in production.
- [x] Secret admin URL is not committed.
- [x] Secret admin URL is not linked publicly.
- [x] Legal API should expose only legal page content.
- [x] Django admin requires login.
- [x] `backend/backups/*.json` remains ignored.
- [x] Root-level duplicate brand image originals remain untracked local files.

## Asset and link audit results

Current references:

- favicon: `/website-favicon.png`
- Apple touch icon: `/website-favicon.png`
- manifest: `/site.webmanifest`
- Open Graph image: `https://uzvibes.com/og-image.svg`
- Twitter/X image: `https://uzvibes.com/og-image.svg`
- visible logo: `/website-logo.png`
- Privacy: `/privacy`
- Terms: `/terms`
- Contact: `#contact` or `/#contact`
- App Store placeholder: `#app-store`
- Google Play placeholder: `#google-play`

No broken static asset references were found in the inspected metadata and React source.

## Files changed

- `PHASE_WEBSITE_1_9_SECURITY_QA_NOTES.md`

## Checks run

```bash
npm run typecheck
VITE_LEGAL_API_BASE_URL=/legal-api npm run build
cd backend && python3 manage.py check
```

Production smoke checks:

```bash
curl -I https://uzvibes.com/
curl -I https://uzvibes.com/privacy
curl -I https://uzvibes.com/terms
curl -I https://uzvibes.com/sitemap.xml
curl -I https://uzvibes.com/robots.txt
curl -I https://uzvibes.com/site.webmanifest
curl https://uzvibes.com/legal-api/legal-pages/privacy/
curl -I https://uzvibes.com/admin/
```

## Assumptions

- The current nginx server remains the production static host for `uzvibes.com`.
- HTTPS is stable and HSTS can remain enabled.
- No service worker is needed for launch readiness.
- The public site does not need browser permissions such as camera, microphone, geolocation, payment, or USB.

## Known TODOs

- Enforce final CSP after testing.
- Add analytics only after a privacy decision.
- Finalize Privacy and Terms content.
- Complete legal review before public launch.
- Replace App Store and Google Play URLs when published.
- Configure automated uptime monitoring later.
