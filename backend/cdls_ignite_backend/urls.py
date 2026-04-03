from django.contrib import admin  # type: ignore
from django.urls import path, include  # type: ignore
from accounts.views import AdminLoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    # ── Auth ──────────────────────────────────────────────────────────────────
    # Custom login view: uses Django authenticate() + DRF Token directly.
    # This intentionally bypasses django-allauth to avoid 500 errors caused by
    # allauth trying to access email/session tables that are not fully set up
    # on our MongoDB backend.
    path('api/auth/login/', AdminLoginView.as_view(), name='admin_login'),
    # Keep the rest of dj_rest_auth for logout, password-change, etc.
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/core/', include('core.urls')),
    path('api/events/', include('events.urls')),
    path('api/members/', include('members.urls')),
]

from django.conf import settings  # type: ignore
from django.conf.urls.static import static  # type: ignore
from django.urls import re_path  # type: ignore
from django.views.static import serve  # type: ignore

# Serve media files in production (when DEBUG=False) without external storage
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
]
