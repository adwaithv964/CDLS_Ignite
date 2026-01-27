from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=50) # Beginners, Advanced, etc.
    type_color = models.CharField(max_length=50, blank=True) # e.g. bg-purple-500
    registrations = models.IntegerField(default=0)
    date = models.CharField(max_length=50) 
    time = models.CharField(max_length=50)
    location = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    dept = models.CharField(max_length=255)
    status = models.CharField(max_length=20) # Open, Closed
    is_open = models.BooleanField(default=True)
    image_color = models.CharField(max_length=50, blank=True)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.title

class HostEventRequest(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    event_title = models.CharField(max_length=255)
    organizer_details = models.CharField(max_length=255)
    purpose = models.CharField(max_length=255)
    date = models.CharField(max_length=50) # Keep as char for flexibility or DateField
    time = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    participants_count = models.IntegerField()
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Host Request: {self.event_title} by {self.name}"
