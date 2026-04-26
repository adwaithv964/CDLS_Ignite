import re
from django.conf import settings
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework import status
from .models import Member
from .serializers import MemberSerializer


def _is_mongo():
    """Return True when the active database backend is MongoDB."""
    engine = settings.DATABASES.get('default', {}).get('ENGINE', '')
    return 'mongo' in engine.lower()


class MemberListCreateView(generics.ListCreateAPIView):
    serializer_class = MemberSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    def get_queryset(self):
        queryset = Member.objects.all()

        # Single type filter (legacy: ?type=mentor)
        member_type = self.request.query_params.get('type')
        if member_type:
            queryset = queryset.filter(member_type=member_type)

        # Multi-type filter (comma-separated: ?types=gig_worker,mentor)
        types_param = self.request.query_params.get('types')
        if types_param:
            types_list = [t.strip() for t in types_param.split(',') if t.strip()]
            if types_list:
                queryset = queryset.filter(member_type__in=types_list)

        # Live name search: ?search=Ada  →  case-insensitive contains match
        # NOTE: django-mongodb-backend does NOT support icontains — use __regex instead.
        search = self.request.query_params.get('search')
        if search and search.strip():
            escaped = re.escape(search.strip())
            if _is_mongo():
                queryset = queryset.filter(name__regex=f'(?i){escaped}')
            else:
                queryset = queryset.filter(name__icontains=search.strip())

        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def list(self, request, *args, **kwargs):
        """Wrap list so ORM errors return JSON 500 instead of an HTML crash page."""
        try:
            return super().list(request, *args, **kwargs)
        except Exception as exc:
            return Response(
                {'error': str(exc)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class MemberDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_permissions(self):
        if self.request.method == 'GET':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
