"""
Custom login view that bypasses django-allauth entirely.

dj-rest-auth's default LoginView delegates through allauth which tries to
interact with the allauth_emailaddress table and django_session table — both
of which cause 500 errors on our MongoDB backend.

This view uses only Django's core `authenticate()` and DRF's Token model,
which are fully supported on MongoDB.
"""
from django.contrib.auth import authenticate, get_user_model
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

User = get_user_model()


class AdminLoginView(APIView):
    """
    POST /api/auth/login/
    Body: { "email": "...", "password": "..." }
    Returns: { "key": "<token>" }  (same shape as dj-rest-auth)
    """
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        password = request.data.get('password', '')

        if not email or not password:
            return Response(
                {'non_field_errors': ['Must include "email" and "password".']},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Authenticate against the email field (USERNAME_FIELD = 'email')
        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response(
                {'non_field_errors': ['Unable to log in with provided credentials.']},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.is_active:
            return Response(
                {'non_field_errors': ['User account is disabled.']},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.is_staff:
            return Response(
                {'non_field_errors': ['You do not have admin privileges.']},
                status=status.HTTP_403_FORBIDDEN,
            )

        # Get or create a DRF auth token — no sessions, no allauth tables touched
        token, _ = Token.objects.get_or_create(user=user)

        return Response({'key': token.key}, status=status.HTTP_200_OK)
