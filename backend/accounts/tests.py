from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .views import _resolve_user_pk

User = get_user_model()


class ResolveUserPkTests(TestCase):
    def test_recovers_pk_from_queryset_when_instance_pk_is_missing(self):
        user = User.objects.create_superuser(
            username='admin',
            email='admin@cdls.com',
            password='secret123',
            full_name='Admin User',
        )

        missing_pk_user = User.objects.get(email='admin@cdls.com')
        setattr(missing_pk_user, missing_pk_user._meta.pk.attname, None)

        resolved_pk = _resolve_user_pk(missing_pk_user, 'admin@cdls.com')

        self.assertEqual(resolved_pk, user.pk)
        self.assertEqual(getattr(missing_pk_user, missing_pk_user._meta.pk.attname), user.pk)


class AdminLoginViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(
            username='admin',
            email='admin@cdls.com',
            password='secret123',
            full_name='Admin User',
        )

    def test_login_returns_token_and_authenticates_user_endpoint(self):
        response = self.client.post(
            '/api/auth/login/',
            {'email': 'admin@cdls.com', 'password': 'secret123'},
            format='json',
        )

        self.assertEqual(response.status_code, 200)
        token_key = response.data['key']
        self.assertTrue(Token.objects.filter(key=token_key, user=self.admin).exists())

        user_response = self.client.get(
            '/api/auth/user/',
            HTTP_AUTHORIZATION=f'Token {token_key}',
        )

        self.assertEqual(user_response.status_code, 200)
        self.assertEqual(user_response.data['email'], 'admin@cdls.com')

    def test_login_uses_queryset_pk_fallback_for_token_creation(self):
        original_get = User.objects.get

        def get_with_missing_pk(*args, **kwargs):
            user = original_get(*args, **kwargs)
            setattr(user, user._meta.pk.attname, None)
            return user

        with patch.object(User.objects, 'get', side_effect=get_with_missing_pk):
            response = self.client.post(
                '/api/auth/login/',
                {'email': 'admin@cdls.com', 'password': 'secret123'},
                format='json',
            )

        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['key'])
