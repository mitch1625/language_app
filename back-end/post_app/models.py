from django.db import models
from user_app.models import User

class Post(models.Model):
    poster = models.ForeignKey(User, related_name='user', blank=True, null=True, on_delete=models.CASCADE)
    post_content = models.TextField(null=True, blank=True)
    date_created = models.DateTimeField(auto_now=True, null=True, blank=True)
    