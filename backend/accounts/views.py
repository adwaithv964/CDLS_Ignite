"""
Custom login view that bypasses django-allauth entirely.

dj-rest-auth's default LoginView routes through allauth, which expects allauth
email rows and can also touch session storage. This view authenticates directly
against the User model and returns the same {"key": "..."} payload shape that
the frontend already expects.
"""
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()


def _resolve_user_pk(user, email):
    """
    Recover a stable primary key for MongoDB-backed users.

    django-mongodb-backend can occasionally return a queried model instance
    whose in-memory pk is still empty. Passing that object into related ORM
    filters then raises:

        "Model instances passed to related filters must be saved."

    We avoid that by fetching the raw pk from the queryset and backfilling the
    instance before token creation.
    """
    user_pk = getattr(user, user._meta.pk.attname, None)
    if user_pk is not None:
        return user_pk

    user_pk = User.objects.filter(email=email).values_list('pk', flat=True).first()
    if user_pk is None:
        user_pk = User.objects.filter(email__iexact=email).values_list('pk', flat=True).first()

    if user_pk is not None:
        setattr(user, user._meta.pk.attname, user_pk)

    return user_pk


class AdminLoginView(APIView):
    """
    POST /api/auth/login/
    Body: { "email": "...", "password": "..." }
    Returns: { "key": "<token>" }
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

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            try:
                user = User.objects.get(email__iexact=email)
            except User.DoesNotExist:
                return Response(
                    {'non_field_errors': ['No account found with this email address.']},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            except Exception as e:
                return Response(
                    {'non_field_errors': [f'Database error (iexact): {str(e)}']},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        except Exception as e:
            return Response(
                {'non_field_errors': [f'Database error: {str(e)}']},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        if not user.check_password(password):
            return Response(
                {'non_field_errors': ['Incorrect password.']},
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

        user_pk = _resolve_user_pk(user, email)
        if user_pk is None:
            return Response(
                {'non_field_errors': ['Token creation error: could not resolve user primary key.']},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        try:
            token, _ = Token.objects.get_or_create(user_id=user_pk)
        except Exception as e:
            return Response(
                {'non_field_errors': [f'Token creation error: {str(e)}']},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({'key': token.key}, status=status.HTTP_200_OK)
