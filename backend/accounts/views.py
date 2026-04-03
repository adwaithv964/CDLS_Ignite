"""
Custom login view that bypasses django-allauth entirely.

dj-rest-auth's default LoginView routes through allauth, which:
1. Calls filter_users_by_email() — requires a record in allauth_emailaddress
   (users created via create_superuser() don't have one, so this returns None)
2. Calls django_login() — writes to django_session (not fully supported on MongoDB)

This view queries the User table directly and uses check_password(), which
only touches the accounts_customuser collection — fully supported on MongoDB.
"""
from django.contrib.auth import get_user_model
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

        # ── Direct DB lookup — bypasses allauth's AuthenticationBackend which
        # requires an allauth_emailaddress record that create_superuser() never
        # creates. We only touch the accounts_customuser collection here.
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return Response(
                {'non_field_errors': ['Unable to log in with provided credentials.']},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {'non_field_errors': [f'Database error: {str(e)}']},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        if not user.check_password(password):
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
