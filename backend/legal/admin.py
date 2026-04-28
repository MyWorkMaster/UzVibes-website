from django.contrib import admin

from .models import LegalPage


@admin.register(LegalPage)
class LegalPageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "status", "updated_at", "created_at")
    list_filter = ("status",)
    ordering = ("slug",)
    search_fields = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("title", "slug", "status", "content")}),
        ("Publishing", {"fields": ("published_at",)}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )
