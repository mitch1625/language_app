from django.urls import path
from .views import All_comments

urlpatterns = [
    path("", All_comments.as_view(), name="all_comments")
]