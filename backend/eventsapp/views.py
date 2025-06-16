from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Eventsapp, UserProfile
from .serializers import EventsappSerializer
from rest_framework import serializers

class EventsappListCreateView(generics.ListCreateAPIView):
    serializer_class = EventsappSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Eventsapp.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EventsappDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventsappSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Eventsapp.objects.filter(user=self.request.user)

# Registration serializer
class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=[('attendee', 'Attendee'), ('organizer', 'Event Organizer')])
    organization_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'role', 'organization_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role = validated_data.pop('role')
        organization_name = validated_data.pop('organization_name', '')
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        UserProfile.objects.create(user=user, role=role, organization_name=organization_name)
        return user

# Registration view
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)