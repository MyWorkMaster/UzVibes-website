# Phase Website 1.4 Visual Redesign Legal CMS Notes

## Frontend redesign summary

- Reworked the landing page into a darker, richer black/purple neon visual direction.
- Kept the Vite + React + TypeScript frontend structure.
- Preserved App Store and Google Play placeholder behavior.
- Kept `contact@uzvibes.com`.
- Added lightweight path-based frontend pages for `/privacy`, `/terms`, and a small fallback 404 without adding a router dependency.

## New visual direction

- Deeper black background with violet, magenta, blue, and cyan glow layers.
- More premium glassmorphism cards with gradient borders, stronger shadows, and richer depth.
- More colorful hero visual with orbit rings, a stronger CSS phone mockup, animated map pins, and six floating city/social signal cards.
- More Tashkent nightlife / city social app energy while keeping text readable and sections clean.

## Sections added or improved

- Hero now focuses on `Feel the vibe of Tashkent.`
- What is UZVibes? was expanded into two stronger explanation cards.
- Added How it works with four steps:
  - Discover vibe spots
  - Join place chats
  - Follow events
  - Build your city profile
- Main feature cards were rewritten and visually upgraded.
- City map section now has richer purple/black map styling, active zones, and pulsing pins.
- Community section now explains profiles, posts, chats, friends, rankings, verified users, rewards, and local reputation.
- Added Safety and consent section covering consent-based location sharing, visibility controls, reporting/moderation, and safer local community design.
- Launch/contact CTA remains near the bottom.

## Animation changes

- CSS-only animations remain the approach.
- Added/expanded:
  - animated gradient text
  - glowing background blobs
  - rotating orbit rings
  - floating vibe cards
  - pulsing city pins and active zones
  - card hover lift and glow
- `prefers-reduced-motion` remains supported.

## Responsive changes

- Hero, phone mockup, orbit rings, floating cards, feature grids, map, safety cards, and footer now adapt across mobile, tablet, desktop, and wide desktop.
- Extra floating cards are hidden on small screens to avoid cramped layouts.
- Store CTAs stack on mobile.
- Header nav keeps horizontal overflow behavior on small screens.

## Django backend structure

Created a minimal Django backend under `backend/`:

- `backend/manage.py`
- `backend/requirements.txt`
- `backend/uzvibes_site/settings.py`
- `backend/uzvibes_site/urls.py`
- `backend/uzvibes_site/asgi.py`
- `backend/uzvibes_site/wsgi.py`
- `backend/legal/models.py`
- `backend/legal/admin.py`
- `backend/legal/views.py`
- `backend/legal/urls.py`
- `backend/legal/migrations/0001_initial.py`
- `backend/legal/management/commands/seed_legal_pages.py`

## LegalPage model details

Fields:

- `title`
- `slug`
- `content`
- `status`
- `created_at`
- `updated_at`
- `published_at`

Status values:

- `draft`
- `published`

Suggested slugs:

- `privacy`
- `terms`

## Admin functionality

- `LegalPage` is registered in Django admin.
- Admin list shows title, slug, status, and updated date.
- Admin search supports title and slug.
- Admin filter supports status.
- Slug is unique.
- Content is editable as plain text.
- No rich text editor dependency was added.

## API endpoints

Public read-only endpoints:

- `GET /api/legal-pages/privacy/`
- `GET /api/legal-pages/terms/`

Response shape:

```json
{
  "title": "Privacy Policy",
  "slug": "privacy",
  "content": "...",
  "status": "draft",
  "updatedAt": "..."
}
```

For this pre-launch phase, the API returns a published page first, then falls back to a draft page, then falls back to a safe hardcoded placeholder. This means draft placeholders can be visible publicly until final legal text is published.

## Frontend legal page behavior

- `/privacy` renders a polished Privacy page.
- `/terms` renders a polished Terms page.
- If `VITE_LEGAL_API_BASE_URL` is configured, the page fetches from the Django legal API.
- If the API is unavailable or the env variable is missing, the page shows safe fallback placeholder content.
- Legal pages show title, status/source metadata, last updated date when available, and a back-to-home link.
- Footer Privacy links to `/privacy`.
- Footer Terms links to `/terms`.
- Footer Contact links to `#contact` on the homepage or `/#contact` from legal pages.

## Environment variables

Frontend:

```bash
VITE_LEGAL_API_BASE_URL=http://127.0.0.1:8000/api
```

Django:

```bash
DJANGO_SECRET_KEY=replace-me
DJANGO_DEBUG=1
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost
DJANGO_CSRF_TRUSTED_ORIGINS=https://uzvibes.com
DJANGO_SQLITE_PATH=/optional/path/to/db.sqlite3
DJANGO_ADMIN_PATH=uzvibes-legal-admin/
DJANGO_STATIC_URL=/django-static/
```

The frontend still builds and runs if `VITE_LEGAL_API_BASE_URL` is missing.

## Production admin exposure

- The Django admin path is configurable through `DJANGO_ADMIN_PATH`.
- The default `/admin/` URL should not be exposed in production.
- Production nginx should proxy only the configured secret admin path to Django.
- The admin URL should not be linked from the public website.
- Django admin still requires staff/superuser authentication.
- Admin and Django static responses should be sent with `X-Robots-Tag: noindex`.

## How to run the frontend

```bash
npm install
npm run dev
```

For frontend validation:

```bash
npm run typecheck
npm run build
```

## How to run the Django backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_legal_pages
python manage.py createsuperuser
python manage.py runserver
```

Admin:

```text
http://127.0.0.1:8000/admin/
```

Local API examples:

```text
http://127.0.0.1:8000/api/legal-pages/privacy/
http://127.0.0.1:8000/api/legal-pages/terms/
```

## Checks run

```bash
npm run typecheck
npm run build
cd backend && python manage.py check
cd backend && python manage.py makemigrations --check
cd backend && python manage.py migrate
cd backend && python manage.py seed_legal_pages
```

## Files changed

- `.gitignore`
- `index.html`
- `src/App.tsx`
- `src/styles.css`
- `src/vite-env.d.ts`
- `backend/requirements.txt`
- `backend/manage.py`
- `backend/uzvibes_site/settings.py`
- `backend/uzvibes_site/urls.py`
- `backend/uzvibes_site/asgi.py`
- `backend/uzvibes_site/wsgi.py`
- `backend/legal/apps.py`
- `backend/legal/models.py`
- `backend/legal/admin.py`
- `backend/legal/views.py`
- `backend/legal/urls.py`
- `backend/legal/migrations/0001_initial.py`
- `backend/legal/management/commands/seed_legal_pages.py`
- `PHASE_WEBSITE_1_4_VISUAL_REDESIGN_LEGAL_CMS_NOTES.md`

## Assumptions

- The Django backend is only for website legal CMS/admin functionality.
- SQLite is acceptable for local development.
- Draft placeholder legal pages may be shown publicly during pre-launch.
- The existing UZVibes mobile app backend remains separate and untouched.
- No final legal claims are made in placeholder content.

## Known TODOs

- Connect Django legal API to production nginx.
- Decide final production domain/path for Django admin/API.
- Replace placeholder Privacy/Terms content with final legal text before public launch.
- Review final legal documents with qualified legal counsel.
- Replace App Store and Google Play placeholders when apps are published.
- Replace placeholder brand/social assets if the final brand kit changes.
