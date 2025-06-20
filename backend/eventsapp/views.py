from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
# from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import Eventsapp, UserProfile
from .serializers import EventsappSerializer, RegisterSerializer, UserProfileSerializer, LoginSerializer 
from rest_framework import serializers
from django.contrib.auth import login

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


# Registration view
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            return Response({'id': user.id, 'role': user.role}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)