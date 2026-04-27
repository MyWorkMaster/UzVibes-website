# Phase Website 1.1 Landing Foundation Notes

## What was built

- Created a React + TypeScript + Vite frontend foundation for the UZVibes public landing website.
- Built a single-page, frontend-only landing page for `uzvibes.com`.
- Kept the implementation focused on public marketing content only. No auth, admin, backend, database, or API logic was added.

## Main sections added

- Hero section with the headline "Feel the vibe of your city.", app store CTAs, launch note, animated floating vibe cards, and a CSS phone/app mockup.
- "What is UZVibes?" section explaining the city-based social app concept.
- Feature cards for Vibe Spots, Place Chats, Local Events, Friends Map, Rewards & Ranks, and Verified Profiles.
- City Vibes section with an abstract animated map and glowing activity pins.
- Social / Community section covering profiles, posts, chats, events, friend activity, and rankings.
- Download CTA section repeating the App Store and Google Play buttons.
- Footer with UZVibes branding, `uzvibes.com`, the required tagline, and placeholder Privacy, Terms, and Contact links.

## Animation approach used

- CSS-only animations were used because the repo started empty and no existing animation library was available.
- Animations include:
  - hero entrance fade/rise
  - floating vibe cards
  - pulsing map pins
  - subtle glowing background movement
  - hover lift states for buttons, feature cards, and community pills
- Reduced-motion preferences are respected with a `prefers-reduced-motion` media query.

## Placeholder links used

- App Store: `#app-store`
- Google Play: `#google-play`
- Footer links:
  - Privacy: `#privacy`
  - Terms: `#terms`
  - Contact: `#contact`

## Files changed

- `package.json`
- `index.html`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/styles.css`
- `PHASE_WEBSITE_1_1_LANDING_FOUNDATION_NOTES.md`

## How to run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Checks

```bash
npm run typecheck
npm run build
```

## Assumptions made

- The repo was empty except for Git metadata, so a clean Vite React TypeScript app was created.
- Real App Store and Google Play URLs are not available yet, so the requested placeholder anchors are used.
- No production app screenshots were available, so the phone preview is a polished CSS mockup based on the described UZVibes mobile app experience.
