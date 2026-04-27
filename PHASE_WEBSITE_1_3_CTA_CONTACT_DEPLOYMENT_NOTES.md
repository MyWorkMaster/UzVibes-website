# Phase Website 1.3 CTA Contact Deployment Notes

## What changed

- Updated the App Store and Google Play calls to action so they clearly communicate that UZVibes is not published yet.
- Added a small launch/contact section near the bottom of the page.
- Cleaned footer links so Contact points to a real section and Privacy/Terms point to a valid placeholder note.
- Preserved the existing dark/neon, glassmorphism, mobile-first landing page direction.

## CTA placeholder behavior

- App Store remains a placeholder anchor: `#app-store`.
- Google Play remains a placeholder anchor: `#google-play`.
- Button copy now says:
  - `Coming soon on App Store`
  - `Coming soon on Google Play`
- The buttons remain styled as polished store badges, but their accessible labels identify them as placeholder links.

## Contact section details

- Added a `#contact` section with:
  - `Launching first in Tashkent`
  - `Want early access or partnership updates?`
  - `contact@uzvibes.com`
- The contact link uses `mailto:contact@uzvibes.com`.
- No contact form, backend, newsletter database, API integration, or analytics were added.

## Footer and anchor updates

- Header navigation now includes a Contact anchor.
- Footer Contact points to `#contact`.
- Footer Privacy and Terms point to `#legal-note`, which explains that legal pages are coming closer to launch.
- Existing smooth scrolling remains handled in CSS.
- Anchor targets use scroll margins so section headings are not hidden after navigation.

## Files changed

- `src/App.tsx`
- `src/styles.css`
- `PHASE_WEBSITE_1_3_CTA_CONTACT_DEPLOYMENT_NOTES.md`

## Checks run

```bash
npm run typecheck
npm run build
```

## Deployment assumptions

- The production site is served from the built Vite `dist/` output.
- `uzvibes.com` is served through nginx with HTTPS enabled.
- The site remains a static frontend-only marketing landing page.
- The existing API service on the server is separate from this website and was not changed in this phase.

## Known TODOs

- Replace the App Store placeholder with the real App Store URL when available.
- Replace the Google Play placeholder with the real Google Play URL when available.
- Add final Privacy and Terms pages before public launch.
- Replace placeholder brand/social assets with final production assets if a finalized brand kit becomes available.
