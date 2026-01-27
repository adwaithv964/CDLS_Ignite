from rest_framework import serializers
from .models import Event, HostEventRequest, EventRegistration

class EventSerializer(serializers.ModelSerializer):
    registrations = serializers.IntegerField(source='registrations_list.count', read_only=True)

    class Meta:
        model = Event
        fields = '__all__'

class HostEventRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostEventRequest
        fields = '__all__'

class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'
