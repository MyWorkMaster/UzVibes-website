from django.core.management.base import BaseCommand

from legal.models import LegalPage


DEFAULT_PAGES = [
    {
        "title": "Privacy Policy",
        "slug": "privacy",
        "status": LegalPage.Status.DRAFT,
        "content": (
            "The final UZVibes Privacy Policy will be published before public launch.\n\n"
            "This placeholder is not a final legal document. It exists so the website "
            "can show an editable Privacy page while the product is still preparing "
            "for launch."
        ),
    },
    {
        "title": "Terms of Service",
        "slug": "terms",
        "status": LegalPage.Status.DRAFT,
        "content": (
            "The final UZVibes Terms of Service will be published before public launch.\n\n"
            "This placeholder is not a final legal document. It exists so the website "
            "can show an editable Terms page while the product is still preparing "
            "for launch."
        ),
    },
]


class Command(BaseCommand):
    help = "Create draft placeholder Privacy and Terms legal pages."

    def handle(self, *args, **options):
        for page_data in DEFAULT_PAGES:
            page, created = LegalPage.objects.get_or_create(
                slug=page_data["slug"],
                defaults=page_data,
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created {page.slug}"))
            else:
                self.stdout.write(f"Skipped {page.slug}; it already exists")
