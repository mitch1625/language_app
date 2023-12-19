from django.urls import path
from .views import Filtered_Post, Create_post, All_post


urlpatterns = [
    path('filtered/', Filtered_Post.as_view(), name="all_posts"),
    path('createpost/', Create_post.as_view(), name='create_post'),
    path('allposts/', All_post.as_view(), name='all_posts')
]