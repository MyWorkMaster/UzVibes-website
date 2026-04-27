# Phase Website 1.2 SEO Metadata Polish Notes

## Metadata added

- Updated the document title to `UZVibes — Feel the vibe of your city`.
- Added the production description for the Tashkent launch positioning.
- Added canonical URL: `https://uzvibes.com/`.
- Added `theme-color` and robots metadata.
- Added Open Graph metadata:
  - `og:title`
  - `og:description`
  - `og:type`
  - `og:url`
  - `og:site_name`
  - `og:image`
  - `og:image:alt`
- Added Twitter/X card metadata:
  - `twitter:card`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`
  - `twitter:image:alt`
- Added JSON-LD metadata for the UZVibes mobile application.

## Favicon and social assets added

- Added `public/favicon.svg` with a dark neon UZ mark.
- Added `public/apple-touch-icon.svg` as a placeholder app icon.
- Added `public/og-image.svg` as a local social sharing preview placeholder.
- No external image URLs were used.

## Accessibility improvements

- Split the app shell into semantic `header`, `main`, and `footer` landmarks.
- Added a skip link for keyboard users.
- Added a primary navigation label and section anchors.
- Marked decorative background layers and floating visual cards as hidden from assistive technology.
- Converted the phone mockup and abstract map to labeled visual images.
- Improved focus-visible styling for links and CTA buttons.

## UI polish changes

- Added a compact glass-style top navigation that matches the existing dark/neon design.
- Improved small-screen header behavior with horizontal overflow for nav links.
- Preserved the existing hero, phone mockup, glass cards, animated city map, community stack, CTA, and footer direction.
- Kept animations CSS-only and lightweight.

## Files changed

- `index.html`
- `public/favicon.svg`
- `public/apple-touch-icon.svg`
- `public/og-image.svg`
- `src/App.tsx`
- `src/styles.css`
- `PHASE_WEBSITE_1_2_SEO_METADATA_POLISH_NOTES.md`

## Checks run

```bash
npm run typecheck
npm run build
```

## Assumptions made

- Real production logo, App Store URL, and Google Play URL are not available yet, so placeholders remain in place.
- SVG placeholder assets are acceptable for this phase and can be replaced by final PNG/brand assets later.
- The current Vite + React + TypeScript app structure should remain unchanged.
