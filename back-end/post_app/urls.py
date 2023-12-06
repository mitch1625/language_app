from django.urls import path
from .views import All_posts


urlpatterns = [
    path('', All_posts.as_view(), name="all_posts")
]