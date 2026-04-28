from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .models import LegalPage


FALLBACK_PAGES = {
    "privacy": {
        "title": "Privacy Policy",
        "slug": "privacy",
        "content": (
            "The final UZVibes Privacy Policy will be published before public launch. "
            "This placeholder explains that privacy details, data handling, location "
            "controls, account settings, and contact options are still being prepared."
        ),
        "status": "draft",
    },
    "terms": {
        "title": "Terms of Service",
        "slug": "terms",
        "content": (
            "The final UZVibes Terms of Service will be published before public launch. "
            "This placeholder explains that usage rules, account responsibilities, "
            "community standards, and platform terms are still being prepared."
        ),
        "status": "draft",
    },
}


def serialize_legal_page(page: LegalPage) -> dict:
    return {
        "title": page.title,
        "slug": page.slug,
        "content": page.content,
        "status": page.status,
        "updatedAt": page.updated_at.isoformat(),
    }


@require_GET
def legal_page_detail(_request, slug: str):
    if slug not in FALLBACK_PAGES:
        return JsonResponse({"detail": "Not found"}, status=404)

    page = (
        LegalPage.objects.filter(slug=slug, status=LegalPage.Status.PUBLISHED).first()
        or LegalPage.objects.filter(slug=slug, status=LegalPage.Status.DRAFT).first()
    )

    if page is not None:
        return JsonResponse(serialize_legal_page(page))

    return JsonResponse(FALLBACK_PAGES[slug])
