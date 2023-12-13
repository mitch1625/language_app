from django.urls import path
from .views import All_comments, Create_comment

urlpatterns = [
    path("", All_comments.as_view(), name="all_comments"),
    path('createcomment/', Create_comment.as_view(), name='create_comment')
]