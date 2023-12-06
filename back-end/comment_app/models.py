from django.db import models
from post_app.models import Post
from user_app.models import User


class Comment(models.Model):
    post_id = models.ForeignKey(Post, related_name='post', on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField(blank=True, null=True)
    comment_user = models.ForeignKey(User, related_name='comment_user', on_delete=models.CASCADE, blank=True, null=True)