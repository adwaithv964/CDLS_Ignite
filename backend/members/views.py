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
        member_type = self.request.query_params.get('type')
        if member_type:
            queryset = queryset.filter(member_type=member_type)
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
