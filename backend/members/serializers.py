from rest_framework import serializers
from .models import Member


class MemberSerializer(serializers.ModelSerializer):
    # Use SerializerMethodField so both MongoDB ObjectId and SQLite integer
    # PKs are safely converted to a plain string — avoids 500 errors on MongoDB.
    id = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Member
        fields = '__all__'
        # 'id' is already covered by SerializerMethodField; exclude the raw PK
        # so DRF doesn't try to deserialize it on write requests.
        read_only_fields = ['id', 'created_at']

    def get_id(self, obj):
        """Return the PK as a plain string regardless of type (int or ObjectId)."""
        return str(obj.pk) if obj.pk is not None else None

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
