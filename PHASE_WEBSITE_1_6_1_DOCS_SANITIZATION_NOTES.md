# Phase Website 1.6.1 Docs Sanitization Notes

## What changed

- Replaced the production backup copy example that used a real server IP and privileged SSH user with a generic placeholder:
  - `scp user@your-server:/var/backups/uzvibes/legal_pages_YYYYMMDD_HHMMSS.json .`
- Confirmed no real admin path, passwords, secret keys, or private local machine paths were added.

## Brand asset handling

- Inspected the root-level `website-favicon.png` and `website-logo.png` files.
- Confirmed they match the already committed production assets:
  - `public/website-favicon.png`
  - `public/website-logo.png`
- Left the root-level copies untracked as local originals to avoid committing duplicate image files.
- The website continues to use the committed `public/` copies.

## Files changed

- `PHASE_WEBSITE_1_6_LEGAL_CMS_BACKUP_HARDENING_NOTES.md`
- `PHASE_WEBSITE_1_6_1_DOCS_SANITIZATION_NOTES.md`

## Checks run

```bash
npm run typecheck
VITE_LEGAL_API_BASE_URL=/legal-api npm run build
cd backend && python3 manage.py check
```
