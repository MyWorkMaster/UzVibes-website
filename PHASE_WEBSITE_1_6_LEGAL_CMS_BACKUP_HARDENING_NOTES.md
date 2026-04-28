# Phase Website 1.6 Legal CMS Backup Hardening Notes

## Backup/export command

Added:

```bash
python manage.py export_legal_pages
```

Default output:

```text
backend/backups/legal_pages_YYYYMMDD_HHMMSS.json
```

The command creates the backups directory if needed and exports every `LegalPage`.

Included fields:

- `title`
- `slug`
- `content`
- `status`
- `created_at`
- `updated_at`
- `published_at`

Not included:

- Django users
- passwords
- sessions
- admin logs
- unrelated database tables

Optional output path:

```bash
python manage.py export_legal_pages --output /secure/path/legal_pages.json
```

## Import/restore command

Added:

```bash
python manage.py import_legal_pages path/to/legal_pages.json
```

Behavior:

- validates the import file exists
- validates JSON shape
- validates required fields
- validates status values
- upserts by `slug`
- updates `title`, `content`, `status`, and `published_at`
- preserves `created_at` and `updated_at` from the export when present
- does not delete legal pages missing from the import file
- prints a created/updated summary

## Admin changes

`LegalPageAdmin` remains simple:

- list shows title, slug, status, updated date, and created date
- status filter remains enabled
- title/slug search remains enabled
- slug remains unique through the model
- created/updated timestamps remain read-only
- admin ordering is now by slug

No admin dependencies or rich text editor were added.

## Env example changes

Updated `backend/.env.example` with safe placeholders only:

```bash
DJANGO_SECRET_KEY=change-me
DJANGO_DEBUG=0
DJANGO_ALLOWED_HOSTS=uzvibes.com,127.0.0.1,localhost
DJANGO_CSRF_TRUSTED_ORIGINS=https://uzvibes.com
DJANGO_ADMIN_PATH=replace-with-secret-path/
DJANGO_STATIC_URL=/django-static/
DJANGO_STATIC_ROOT=/path/to/staticfiles
DJANGO_SQLITE_PATH=/path/to/db.sqlite3
DJANGO_SESSION_COOKIE_SECURE=true
DJANGO_CSRF_COOKIE_SECURE=true
DJANGO_SECURE_SSL_REDIRECT=0
```

No real secrets, passwords, or real admin URL are committed.

## Backup operations

Export on production:

```bash
cd /opt/uzvibes-website/backend
set -a
. /etc/uzvibes-legal-cms.env
set +a
.venv/bin/python manage.py export_legal_pages --output /var/backups/uzvibes/legal_pages_$(date +%Y%m%d_%H%M%S).json
```

Copy backups from server:

```bash
scp root@45.80.148.101:/var/backups/uzvibes/legal_pages_YYYYMMDD_HHMMSS.json .
```

Restore on production:

```bash
cd /opt/uzvibes-website/backend
set -a
. /etc/uzvibes-legal-cms.env
set +a
.venv/bin/python manage.py import_legal_pages /var/backups/uzvibes/legal_pages_YYYYMMDD_HHMMSS.json
```

Recommended frequency before public launch:

- export after every meaningful Privacy or Terms edit
- export immediately before launch
- export after final legal review changes are saved
- keep at least one off-server copy

## Production checklist

Before launch:

- replace placeholder Privacy content
- replace placeholder Terms content
- review legal text with qualified legal counsel
- replace App Store link
- replace Google Play link
- rotate Django admin path if exposed
- rotate admin password if shared
- run `export_legal_pages` after final legal content is saved
- back up the SQLite database or move legal CMS storage to PostgreSQL
- verify `/admin/` returns 404
- verify `/legal-api/legal-pages/privacy/` works
- verify `/legal-api/legal-pages/terms/` works
- verify frontend fallback still works if API is unavailable

## Files changed

- `.gitignore`
- `src/App.tsx`
- `backend/.env.example`
- `backend/uzvibes_site/settings.py`
- `backend/legal/admin.py`
- `backend/legal/management/commands/export_legal_pages.py`
- `backend/legal/management/commands/import_legal_pages.py`
- `PHASE_WEBSITE_1_6_LEGAL_CMS_BACKUP_HARDENING_NOTES.md`

## Checks run

```bash
npm run typecheck
VITE_LEGAL_API_BASE_URL=/legal-api npm run build
cd backend && python manage.py check
cd backend && python manage.py makemigrations --check
cd backend && python manage.py migrate
cd backend && python manage.py export_legal_pages
cd backend && python manage.py import_legal_pages <exported-file>
```

## Assumptions

- SQLite remains acceptable temporarily for the small legal CMS.
- Backups should be stored outside the Git repository for real production use.
- Exported JSON contains public legal page content only, but should still be handled carefully.
- The real admin URL should not be documented in repo files.

## Known TODOs

- Move legal CMS from SQLite to PostgreSQL if production content becomes important.
- Configure automated server-side backups.
- Add monitoring for the Django service.
- Finalize Privacy/Terms text before launch.
- Complete legal review before launch.
- Rotate admin path/password before public launch if needed.
