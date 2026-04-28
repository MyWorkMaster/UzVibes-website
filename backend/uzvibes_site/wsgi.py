"""WSGI config for the UZVibes website legal CMS."""
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "uzvibes_site.settings")

application = get_wsgi_application()
