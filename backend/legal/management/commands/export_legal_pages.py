import json
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand
from django.core.serializers.json import DjangoJSONEncoder
from django.utils import timezone

from legal.models import LegalPage


class Command(BaseCommand):
    help = "Export all LegalPage records to a timestamped JSON backup."

    def add_arguments(self, parser):
        parser.add_argument(
            "--output",
            "-o",
            help="Optional output file path. Defaults to backend/backups/legal_pages_YYYYMMDD_HHMMSS.json.",
        )

    def handle(self, *args, **options):
        output = options.get("output")
        if output:
            output_path = Path(output)
        else:
            timestamp = timezone.localtime().strftime("%Y%m%d_%H%M%S")
            output_path = Path(settings.BASE_DIR) / "backups" / f"legal_pages_{timestamp}.json"

        output_path.parent.mkdir(parents=True, exist_ok=True)

        pages = [
            {
                "title": page.title,
                "slug": page.slug,
                "content": page.content,
                "status": page.status,
                "created_at": page.created_at,
                "updated_at": page.updated_at,
                "published_at": page.published_at,
            }
            for page in LegalPage.objects.order_by("slug")
        ]

        output_path.write_text(
            json.dumps(pages, cls=DjangoJSONEncoder, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )

        self.stdout.write(self.style.SUCCESS(f"Exported {len(pages)} legal pages to {output_path}"))
