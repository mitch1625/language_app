from .models import Comment
from rest_framework.serializers import ModelSerializer, SerializerMethodField

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