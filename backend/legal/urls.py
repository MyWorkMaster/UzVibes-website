from django.urls import path

from .views import legal_page_detail

urlpatterns = [
    path("legal-pages/<slug:slug>/", legal_page_detail, name="legal-page-detail"),
]
