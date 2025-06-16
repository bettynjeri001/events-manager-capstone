from django.urls import path
from .views import (
    EventsappListCreateView,
    EventsappDetailView,
    RegisterView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('', EventsappListCreateView.as_view(), name='eventsapp_list_create'),
    path('<int:pk>/', EventsappDetailView.as_view(), name='eventsapp_detail'),
]