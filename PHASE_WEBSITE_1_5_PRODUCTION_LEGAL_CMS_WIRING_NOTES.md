# Phase Website 1.5 Production Legal CMS Wiring Notes

## Production architecture

- `https://uzvibes.com/` serves the static Vite frontend.
- Frontend legal routes remain:
  - `/privacy`
  - `/terms`
- The frontend uses the same-domain legal API base:
  - `VITE_LEGAL_API_BASE_URL=/legal-api`
- Django remains a separate legal CMS/admin service, intended to bind only to localhost behind nginx.
- Django internal API remains `/api/`.
- Nginx maps public `/legal-api/` to Django internal `/api/`.
- Django admin is available only through a secret configurable path and is not linked from the public frontend.

## Frontend env variable

Add this to the frontend production build environment:

```bash
VITE_LEGAL_API_BASE_URL=/legal-api
```

This builds legal requests as:

```text
https://uzvibes.com/legal-api/legal-pages/privacy/
https://uzvibes.com/legal-api/legal-pages/terms/
```

The frontend still builds and runs if `VITE_LEGAL_API_BASE_URL` is missing. In that case `/privacy` and `/terms` use safe fallback placeholder content.

See `.env.example`.

## Django env variables

Use environment variables for production. Do not commit real secrets.

```bash
DJANGO_SECRET_KEY=replace-with-a-generated-secret
DJANGO_DEBUG=0
DJANGO_ALLOWED_HOSTS=uzvibes.com,127.0.0.1,localhost
DJANGO_CSRF_TRUSTED_ORIGINS=https://uzvibes.com
DJANGO_SQLITE_PATH=/var/lib/uzvibes-legal-cms/db.sqlite3
DJANGO_ADMIN_PATH=replace-with-secret-admin-path/
DJANGO_STATIC_URL=/django-static/
DJANGO_SESSION_COOKIE_SECURE=true
DJANGO_CSRF_COOKIE_SECURE=true
DJANGO_SECURE_SSL_REDIRECT=false
```

Notes:

- `DJANGO_SECRET_KEY` is required when `DJANGO_DEBUG=0`.
- `DJANGO_SECURE_SSL_REDIRECT=false` is recommended behind nginx when nginx already terminates TLS and redirects HTTP to HTTPS.
- `SECURE_PROXY_SSL_HEADER` is enabled in Django settings for reverse-proxy HTTPS awareness.
- SQLite is acceptable only as a temporary small CMS store for this phase.

See `backend/.env.example`.

## Legal API production paths

Public paths:

```text
GET https://uzvibes.com/legal-api/legal-pages/privacy/
GET https://uzvibes.com/legal-api/legal-pages/terms/
```

Django internal paths:

```text
GET http://127.0.0.1:8010/api/legal-pages/privacy/
GET http://127.0.0.1:8010/api/legal-pages/terms/
```

Nginx should proxy `/legal-api/` to Django `/api/`.

## Admin path strategy

- Admin path is configured with `DJANGO_ADMIN_PATH`.
- Do not use `/admin/` in production.
- Do not link the admin URL from the public frontend.
- Keep the admin path long, non-obvious, and rotate it if exposed.
- Django admin still requires staff/superuser authentication.
- Add `X-Robots-Tag: noindex, nofollow, noarchive` to admin responses at nginx.

## Nginx example

This is an example only. Keep TLS certificate paths and existing static frontend config aligned with the production server.

```nginx
server {
    listen 443 ssl http2;
    server_name uzvibes.com;
    root /var/www/uzvibes.com;
    index index.html;

    # TLS config omitted for brevity.

    location = /admin { return 404; }
    location ^~ /admin/ { return 404; }

    location ^~ /replace-with-secret-admin-path/ {
        add_header X-Robots-Tag "noindex, nofollow, noarchive" always;
        proxy_pass http://127.0.0.1:8010/replace-with-secret-admin-path/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /legal-api/ {
        add_header X-Robots-Tag "noindex" always;
        proxy_pass http://127.0.0.1:8010/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ^~ /django-static/ {
        alias /opt/uzvibes-website/backend/staticfiles/;
        expires 7d;
        add_header Cache-Control "public";
        add_header X-Robots-Tag "noindex" always;
    }

    location /assets/ {
        try_files $uri =404;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Systemd example

```ini
[Unit]
Description=UZVibes website legal CMS
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/opt/uzvibes-website/backend
EnvironmentFile=/etc/uzvibes-legal-cms.env
ExecStart=/opt/uzvibes-website/backend/.venv/bin/gunicorn uzvibes_site.wsgi:application --bind 127.0.0.1:8010 --workers 2 --timeout 60
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

## Backend static files

Django admin static files must be collected before production use:

```bash
cd backend
python manage.py collectstatic --noinput
```

`STATIC_ROOT` is configured as `backend/staticfiles`, and `DJANGO_STATIC_URL` defaults to `/django-static/`.

## Local development notes

Frontend:

```bash
npm install
npm run dev
```

Backend:

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

Optional local frontend API env:

```bash
VITE_LEGAL_API_BASE_URL=http://127.0.0.1:8000/api
```

## Deployment checklist

1. Generate a strong `DJANGO_SECRET_KEY`.
2. Set `DJANGO_DEBUG=0`.
3. Set `DJANGO_ALLOWED_HOSTS`.
4. Set `DJANGO_CSRF_TRUSTED_ORIGINS`.
5. Set a non-default `DJANGO_ADMIN_PATH`.
6. Install backend requirements.
7. Run migrations.
8. Seed placeholder legal pages if needed.
9. Create a superuser.
10. Run `collectstatic`.
11. Start Django through systemd on localhost.
12. Configure nginx `/legal-api/`, secret admin path, and `/django-static/`.
13. Build the frontend with `VITE_LEGAL_API_BASE_URL=/legal-api`.
14. Verify `/privacy` and `/terms`.
15. Verify `/admin/` is not exposed.
16. Verify the secret admin path reaches Django login.

## Checks run

```bash
npm run typecheck
VITE_LEGAL_API_BASE_URL=/legal-api npm run build
cd backend && python manage.py check
cd backend && python manage.py makemigrations --check
cd backend && python manage.py migrate
cd backend && python manage.py seed_legal_pages
cd backend && python manage.py collectstatic --noinput
```

## Files changed

- `.env.example`
- `backend/.env.example`
- `backend/uzvibes_site/settings.py`
- `PHASE_WEBSITE_1_5_PRODUCTION_LEGAL_CMS_WIRING_NOTES.md`

## Known TODOs

- Replace SQLite with PostgreSQL if legal CMS content becomes important production data.
- Add backups for the legal CMS database.
- Add final Privacy/Terms text before public launch.
- Review final legal content with qualified legal counsel.
- Rotate admin path/credentials if exposed accidentally.
- Add monitoring later.
