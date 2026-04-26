from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from members.models import Member


User = get_user_model()


class EventApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='secret123',
            full_name='Admin User',
        )
        self.member = Member.objects.create(
            member_type='mentor',
            name='Organizer Name',
            institution='CDLS',
        )
        self.client.force_authenticate(user=self.admin)

    def test_create_event_and_registration_use_string_ids(self):
        create_response = self.client.post(
            '/api/events/',
            {
                'title': 'Startup Meetup',
                'type': 'Workshop',
                'type_color': 'bg-purple-500',
                'date': '2026-04-10',
                'time': '18:30',
                'location': 'CDLS Office',
                'author': 'Organizer Name',
                'author_member_id': str(self.member.pk),
                'dept': 'Community',
                'status': 'Open',
                'image_color': 'bg-blue-100',
                'is_open': True,
            },
            format='multipart',
        )

        self.assertEqual(create_response.status_code, 201)
        event_id = create_response.data['id']
        self.assertIsInstance(event_id, str)
        self.assertEqual(create_response.data['author_member_id'], str(self.member.pk))

        list_response = self.client.get('/api/events/')
        self.assertEqual(list_response.status_code, 200)
        self.assertEqual(list_response.data[0]['id'], event_id)

        registration_response = self.client.post(
            '/api/events/register/',
            {
                'event': event_id,
                'name': 'Visitor',
                'email': 'visitor@example.com',
                'phone': '9999999999',
            },
            format='json',
        )
        self.assertEqual(registration_response.status_code, 201)
        self.assertEqual(registration_response.data['event'], event_id)

        registrations_list_response = self.client.get(f'/api/events/registrations/{event_id}/')
        self.assertEqual(registrations_list_response.status_code, 200)
        self.assertEqual(registrations_list_response.data[0]['event'], event_id)
