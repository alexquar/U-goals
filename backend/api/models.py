from django.db import models
from django.contrib.auth.models import User

class Goal(models.Model):
    title = models.CharField(max_length=100)
    about = models.TextField()
    complete_by = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="goals") #foreign key that references the user that ones it, can do the same later to attach plans onto goals

    def __str__(self):
        return self.title