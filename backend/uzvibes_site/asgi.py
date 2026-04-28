"""ASGI config for the UZVibes website legal CMS."""
import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "uzvibes_site.settings")

application = get_asgi_application()
