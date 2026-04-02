from rest_framework import generics, permissions, filters
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Member
from .serializers import MemberSerializer


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
        search = self.request.query_params.get('search')
        if search and search.strip():
            queryset = queryset.filter(name__icontains=search.strip())

        return queryset

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


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
