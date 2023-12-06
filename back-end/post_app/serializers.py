from rest_framework.serializers import ModelSerializer
from .models import Post
from user_app.serializers import UserSerializer, User

class PostSerializer(ModelSerializer):
    poster = UserSerializer()
    class Meta:
        model = Post
        fields = ['poster', 'post_content']