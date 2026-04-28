# Phase Website 1.8 Launch Readiness Notes

## Sitemap

Added `public/sitemap.xml` with only public website pages:

- `https://uzvibes.com/`
- `https://uzvibes.com/privacy`
- `https://uzvibes.com/terms`

The sitemap intentionally does not include legal API endpoints, Django static paths, `/admin/`, or any secret admin path.

## Robots.txt

Added `public/robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://uzvibes.com/sitemap.xml
```

The file allows indexing of the public landing pages and references the sitemap. It does not expose or document any admin path. Security for admin remains enforced by Django/nginx configuration, not by robots.txt.

## Web App Manifest

Added `public/site.webmanifest` and linked it from `index.html`.

Manifest details:

- `name`: UZVibes
- `short_name`: UZVibes
- `start_url`: `/`
- `display`: `standalone`
- `background_color`: `#030108`
- `theme_color`: `#070914`
- icon: `/website-favicon.png`

No service worker, offline cache, or fake PWA behavior was added.

## Metadata Review

Reviewed the existing metadata and kept the Phase 1.7 brand decisions:

- title remains `UZVibes — Feel the vibe of your city`
- canonical remains `https://uzvibes.com/`
- Open Graph and Twitter/X image remain `/og-image.svg`
- favicon and Apple touch icon remain `/website-favicon.png`
- theme color remains aligned with the dark purple/black brand

## Accessibility And Navigation

Reviewed the current route and anchor setup:

- homepage route: `/`
- legal routes: `/privacy`, `/terms`
- footer links point to `/privacy`, `/terms`, and contact
- header anchors point to public homepage sections
- skip link and visible focus styles remain in place

No UI redesign was made.

## Performance Hygiene

- No dependencies were added.
- No service workers or analytics were added.
- No backend behavior was changed.
- No console logging was introduced.
- Static launch assets are served from `public/` and included in the Vite build output.

## Production Static Asset Notes

Production nginx/static hosting should serve:

- `/sitemap.xml`
- `/robots.txt`
- `/site.webmanifest`

The legal API should remain separate from public page indexing and should keep noindex headers if configured at nginx. The Django admin path must not be linked, documented, or exposed in public frontend assets.

## Files Changed

- `index.html`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/site.webmanifest`
- `PHASE_WEBSITE_1_8_LAUNCH_READINESS_NOTES.md`

## Checks Run

```bash
npm run typecheck
VITE_LEGAL_API_BASE_URL=/legal-api npm run build
cd backend && python3 manage.py check
find dist -maxdepth 1 -type f -name 'sitemap.xml' -o -name 'robots.txt' -o -name 'site.webmanifest'
```

## Assumptions

- Static generation through Vite copies `public/` files directly into `dist/`.
- The current public routes remain `/`, `/privacy`, and `/terms`.
- Legal API endpoints should not be advertised in sitemap files.

## Known TODOs

- Replace the App Store placeholder URL when the app is published.
- Replace the Google Play placeholder URL when the app is published.
- Finalize Privacy and Terms content.
- Complete legal review before public launch.
- Add analytics only after a privacy decision.
- Consider automated uptime monitoring later.
