from rest_framework import serializers
from .models import Event, HostEventRequest

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class HostEventRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostEventRequest
        fields = '__all__'
