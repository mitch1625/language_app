from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Post
from user_app.serializers import UserSerializer, User

class PostSerializer(ModelSerializer):
    poster = SerializerMethodField()

    class Meta:
        model = Post
        fields = ['poster', 'post_content']

    def get_poster(self, obj):
        return obj.poster.display_name, obj.poster.native_language, obj.poster.target_language
    

class CreatePostSerializer(ModelSerializer):
    poster = UserSerializer
    class Meta:
        model = Post
        fields = ['post_content', 'poster']