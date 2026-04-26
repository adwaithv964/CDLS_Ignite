from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Member


User = get_user_model()


class MemberApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='secret123',
            full_name='Admin User',
        )

    def test_public_list_returns_string_ids(self):
        member = Member.objects.create(
            member_type='mentor',
            name='Kiran',
            institution='SRS Company',
        )

        response = self.client.get('/api/members/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]['id'], str(member.pk))

    def test_authenticated_create_update_and_delete_accept_string_pk_routes(self):
        self.client.force_authenticate(user=self.admin)

        create_response = self.client.post(
            '/api/members/',
            {
                'member_type': 'mentor',
                'name': 'Kiran',
                'institution': 'SRS Company',
                'location': 'Kozhikode',
                'tags': 'Entrepreneur',
                'phone': '8461556',
                'email': 'example@gmail.com',
                'profile_details': 'Short bio',
                'expertise_skills': 'Mentoring, Strategy',
            },
            format='multipart',
        )

        self.assertEqual(create_response.status_code, 201)
        member_id = create_response.data['id']
        self.assertIsInstance(member_id, str)

        update_response = self.client.patch(
            f'/api/members/{member_id}/',
            {'location': 'Thamarassery'},
            format='json',
        )
        self.assertEqual(update_response.status_code, 200)
        self.assertEqual(update_response.data['location'], 'Thamarassery')

        delete_response = self.client.delete(f'/api/members/{member_id}/')
        self.assertEqual(delete_response.status_code, 204)
        self.assertFalse(Member.objects.filter(pk=member_id).exists())
