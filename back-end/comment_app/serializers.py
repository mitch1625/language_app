from .models import Comment
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from post_app.serializers import PostSerializer, Post
from user_app.serializers import UserSerializer

class CommentSerializer(ModelSerializer):
    comment_user = SerializerMethodField()
    post = SerializerMethodField()
    class Meta:
        model = Comment
        fields = ['post', 'content', 'comment_user']

    def get_comment_user(self,obj):
        return obj.comment_user.display_name
    
    def get_post(self, obj):
        return obj.post.post_content
    

class CreateCommentSerializer(ModelSerializer):
    post = PostSerializer
    comment_user = UserSerializer
    class Meta:
        model = Comment
        fields = ['post','content','comment_user']