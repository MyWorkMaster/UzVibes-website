# Phase Website 1.7 Brand Social Preview Notes

## Brand assets inspected

- `public/website-favicon.png`
- `public/website-logo.png`
- `public/favicon.svg`
- `public/apple-touch-icon.svg`
- `public/og-image.svg`
- `index.html`
- `src/App.tsx`
- `src/styles.css`

## Asset usage

- Browser favicon: `public/website-favicon.png`
- Apple touch icon: `public/website-favicon.png`
- Visible header/footer logo: `public/website-logo.png`
- Open Graph image: `public/og-image.svg`
- Twitter/X card image: `public/og-image.svg`

The root-level `website-favicon.png` and `website-logo.png` files remain untracked local originals because they duplicate the committed `public/` assets.

## UI polish changes

- Increased visible logo sizing slightly in the header/footer for sharper brand presence.
- Added the UZ brand mark inside the phone mockup top bar.
- Added a subtle decorative logo watermark inside the app preview.
- Refined the mock app cards with clearer labels:
  - Active spots
  - Tonight's events
  - Friends nearby
- Added a soft glow layer behind the phone mockup to better connect it with the purple logo style.

## Metadata changes

- Kept the existing SEO title, canonical URL, Open Graph URL, and Twitter/X card setup.
- Added explicit favicon and Apple icon size attributes.
- Added Open Graph image type and dimensions for the social preview asset.
- Rebuilt `public/og-image.svg` with a darker black/purple neon preview aligned with the current brand direction.

## Mobile responsiveness changes

- Kept the current mobile menu behavior.
- Adjusted mobile logo dimensions so the mark stays readable without crowding the header.
- Kept CTA and hero layout structure unchanged to avoid regressions.

## Files changed

- `index.html`
- `src/App.tsx`
- `src/styles.css`
- `public/og-image.svg`
- `PHASE_WEBSITE_1_7_BRAND_SOCIAL_PREVIEW_NOTES.md`

## Checks run

```bash
npm run typecheck
VITE_LEGAL_API_BASE_URL=/legal-api npm run build
cd backend && python3 manage.py check
```

## Assumptions

- The PNG logo and favicon are the current production brand assets.
- SVG social preview remains acceptable for this phase and avoids adding image-generation dependencies.
- Legal CMS behavior does not need backend changes for this visual polish phase.

## Known TODOs

- Replace the App Store placeholder URL when the app is published.
- Replace the Google Play placeholder URL when the app is published.
- Replace the social preview asset if the final marketing brand kit changes.
- Finalize Privacy and Terms content before public launch.
