from django.urls import path
from .views import All_posts, Create_post


urlpatterns = [
    path('filtered/', All_posts.as_view(), name="all_posts"),
    path('createpost/', Create_post.as_view(), name='create_post')
]