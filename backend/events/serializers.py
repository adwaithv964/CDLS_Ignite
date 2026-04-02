from rest_framework import serializers
from .models import Event, HostEventRequest, EventRegistration

class EventSerializer(serializers.ModelSerializer):
    registrations = serializers.IntegerField(source='registrations_list.count', read_only=True)
    image_url = serializers.SerializerMethodField()
    author_image = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = '__all__'
        extra_kwargs = {
            'image': {'required': False},
        }

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_author_image(self, obj):
        """
        Return the author's profile picture.
        First use the stored author_image_url (set when admin picks from autocomplete).
        Fall back to a live name-based lookup if not stored.
        """
        # 1. Use the directly stored URL (most reliable)
        if obj.author_image_url:
            return obj.author_image_url

        # 2. Live lookup by member_id (if stored)
        if obj.author_member_id:
            try:
                from members.models import Member
                member = Member.objects.get(pk=obj.author_member_id)
                if member.image:
                    request = self.context.get('request')
                    if request:
                        return request.build_absolute_uri(member.image.url)
                    return member.image.url
            except Exception:
                pass

        # 3. Live lookup by name (legacy fallback)
        if obj.author:
            try:
                from members.models import Member
                member = Member.objects.filter(
                    name__iexact=obj.author,
                    member_type__in=['gig_worker', 'mentor']
                ).first()
                if member and member.image:
                    request = self.context.get('request')
                    if request:
                        return request.build_absolute_uri(member.image.url)
                    return member.image.url
            except Exception:
                pass

        return None

class HostEventRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostEventRequest
        fields = '__all__'

class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'
