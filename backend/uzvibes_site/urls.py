"""URL configuration for the UZVibes website legal CMS."""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("legal.urls")),
]
