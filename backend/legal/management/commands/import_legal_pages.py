import json
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.utils.dateparse import parse_datetime

from legal.models import LegalPage


REQUIRED_FIELDS = {"title", "slug", "content", "status"}


def parse_optional_datetime(value, field_name: str, item_index: int):
    if not value:
        return None
    parsed = parse_datetime(value)
    if parsed is None:
        raise CommandError(f"Item {item_index} has invalid {field_name}: {value}")
    return parsed


class Command(BaseCommand):
    help = "Import LegalPage records from a JSON backup, upserting by slug."

    def add_arguments(self, parser):
        parser.add_argument("path", help="Path to a JSON file created by export_legal_pages.")

    def handle(self, *args, **options):
        import_path = Path(options["path"])
        if not import_path.exists():
            raise CommandError(f"Import file does not exist: {import_path}")

        try:
            data = json.loads(import_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            raise CommandError(f"Import file is not valid JSON: {exc}") from exc

        if not isinstance(data, list):
            raise CommandError("Import file must contain a JSON array of legal pages.")

        valid_statuses = {choice.value for choice in LegalPage.Status}
        created_count = 0
        updated_count = 0

        for index, item in enumerate(data, start=1):
            if not isinstance(item, dict):
                raise CommandError(f"Item {index} must be an object.")

            missing = REQUIRED_FIELDS - set(item)
            if missing:
                raise CommandError(f"Item {index} is missing required fields: {', '.join(sorted(missing))}")

            if item["status"] not in valid_statuses:
                raise CommandError(f"Item {index} has invalid status: {item['status']}")

            parsed_published_at = parse_optional_datetime(item.get("published_at"), "published_at", index)

            page, created = LegalPage.objects.update_or_create(
                slug=item["slug"],
                defaults={
                    "title": item["title"],
                    "content": item["content"],
                    "status": item["status"],
                    "published_at": parsed_published_at,
                },
            )

            timestamp_updates = {}
            if item.get("created_at"):
                timestamp_updates["created_at"] = parse_optional_datetime(item["created_at"], "created_at", index)
            if item.get("updated_at"):
                timestamp_updates["updated_at"] = parse_optional_datetime(item["updated_at"], "updated_at", index)
            if timestamp_updates:
                LegalPage.objects.filter(pk=page.pk).update(**timestamp_updates)

            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Imported {len(data)} legal pages from {import_path}: "
                f"{created_count} created, {updated_count} updated."
            )
        )
