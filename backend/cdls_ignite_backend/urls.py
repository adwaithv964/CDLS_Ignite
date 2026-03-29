from django.contrib import admin  # type: ignore
from django.urls import path, include  # type: ignore

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
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
