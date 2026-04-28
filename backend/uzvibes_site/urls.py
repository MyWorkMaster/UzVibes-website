"""URL configuration for the UZVibes website legal CMS."""
from django.contrib import admin
from django.conf import settings
from django.urls import include, path

urlpatterns = [
    path(settings.ADMIN_PATH, admin.site.urls),
    path("api/", include("legal.urls")),
]
