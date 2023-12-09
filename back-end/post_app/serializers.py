from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Post
from user_app.serializers import UserSerializer

class PostSerializer(ModelSerializer):
    poster = UserSerializer(many=True)

    class Meta:
        model = Post
        fields = ['poster', 'post_content']

    # def get_poster(self, obj):
    #     return str(obj.poster.display_name)
    