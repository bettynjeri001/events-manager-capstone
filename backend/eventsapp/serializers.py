from rest_framework import serializers
from .models import Eventsapp, UserProfile

class EventsappSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventsapp
        fields = ['id', 'title', 'description', 'is_completed', 'created_at', 'updated_at', 'user']
        read_only_fields = ['id', 'created_at', 'updated_at', 'user']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['role', 'organization_name']