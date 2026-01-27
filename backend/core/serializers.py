from rest_framework import serializers
from .models import ContactMessage, InterestExpression, Subscriber

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class InterestExpressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestExpression
        fields = '__all__'

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'
