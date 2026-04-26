from rest_framework import serializers
from .models import Event, HostEventRequest, EventRegistration  # type: ignore[import]
from members.models import Member  # type: ignore[import]

class EventSerializer(serializers.ModelSerializer):
    # SafeObjectId serialization: works for both MongoDB ObjectId and SQLite int PKs.
    id = serializers.SerializerMethodField(read_only=True)
    author_member_id = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    registrations = serializers.IntegerField(source='registrations_list.count', read_only=True)
    image_url = serializers.SerializerMethodField()
    author_image = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(obj.pk) if obj.pk is not None else None

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
        Return the author's profile picture URL, always computed for the current host.

        Priority:
          1. Member lookup by stored member_id  (fast, reliable across environments)
          2. Member lookup by author name        (legacy fallback for old events)
        """
        request = self.context.get('request')

        # 1. Fast path: lookup by stored member_id
        if obj.author_member_id:
            try:
                member = Member.objects.get(pk=obj.author_member_id)
                if member.image:
                    if request:
                        return request.build_absolute_uri(member.image.url)
                    return member.image.url
            except Exception:
                pass  # fall through to name lookup

        # 2. Legacy fallback: lookup by author name (case-insensitive)
        if obj.author:
            try:
                member = Member.objects.filter(
                    name__iexact=obj.author,
                    member_type__in=['gig_worker', 'mentor']
                ).first()
                if member and member.image:
                    if request:
                        return request.build_absolute_uri(member.image.url)
                    return member.image.url
            except Exception:
                pass

        return None

class HostEventRequestSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField(read_only=True)

    def get_id(self, obj):
        return str(obj.pk) if obj.pk is not None else None

    class Meta:
        model = HostEventRequest
        fields = '__all__'

class EventRegistrationSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField(read_only=True)
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), pk_field=serializers.CharField())

    def get_id(self, obj):
        return str(obj.pk) if obj.pk is not None else None

    class Meta:
        model = EventRegistration
        fields = '__all__'
