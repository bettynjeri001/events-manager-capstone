from django.contrib.auth.models import AbstractUser
from django.db import models

# Custom user model
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('attendee', 'Attendee'),
        ('organizer', 'Organizer'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, null=True, blank=True)

# User profile model
class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.user.username

# Events model
class Eventsapp(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateTimeField()
    location = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.title} by {self.user.username}"
