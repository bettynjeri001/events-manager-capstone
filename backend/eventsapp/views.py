from rest_framework import generics, status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
# from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import Eventsapp, Registration,UserProfile
from .serializers import EventsappSerializer, RegisterSerializer, UserProfileSerializer, LoginSerializer, RegistrationSerializer
from rest_framework import serializers
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

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
    
class EventsappViewSet(viewsets.ModelViewSet):
    queryset = Eventsapp.objects.all()
    serializer_class = EventsappSerializer

class RegistrationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = Registration.objects.all()
        attendee_id = self.request.query_params.get('attendee')
        if attendee_id:
            queryset = queryset.filter(user__id=attendee_id)
        elif hasattr(user, "role") and user.role == "attendee":
            queryset = queryset.filter(user=user)
        return queryset

class MpesaPayView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        amount = request.data.get("amount")
        event_id = request.data.get("event")
        registration_id = request.data.get("registration")
        cl = MpesaClient()
        account_reference = f"event-{event_id}"
        transaction_desc = f"Ticket for event {event_id}"
        callback_url = "https://yourdomain.com/api/mpesa/callback/"

        try:
            response = cl.stk_push(phone, amount, account_reference, transaction_desc, callback_url)
            if response['ResponseCode'] == '0':
                return Response({"message": "Payment initiated. Check your phone for the M-Pesa prompt."}, status=200)
            else:
                return Response({"error": "Payment initiation failed."}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

