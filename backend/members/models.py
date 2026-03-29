from django.db import models

class Member(models.Model):
    MEMBER_TYPE_CHOICES = [
        ('learner', 'Learner'),
        ('gig_worker', 'Gig Worker'),
        ('mentor', 'Mentor'),
    ]

    member_type = models.CharField(max_length=20, choices=MEMBER_TYPE_CHOICES, default='learner')
    name = models.CharField(max_length=255)
    institution = models.CharField(max_length=255, blank=True)  # entity/institution/company
    location = models.CharField(max_length=255, blank=True)
    tags = models.CharField(max_length=500, blank=True)         # comma-separated role tags e.g. "Student,Freelancer"
    phone = models.CharField(max_length=30, blank=True)
    email = models.EmailField(blank=True)
    profile_details = models.TextField(blank=True)
    expertise_skills = models.CharField(max_length=1000, blank=True)  # comma-separated skills
    image = models.ImageField(upload_to='members/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.member_type})"
