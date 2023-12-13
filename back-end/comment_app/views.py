from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CommentSerializer, Comment, CreateCommentSerializer
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
)
from django.shortcuts import get_object_or_404
from post_app.models import Post

class All_comments(APIView):
    def get(self, request):
        comments = CommentSerializer(Comment.objects.order_by('id'), many=True)
        return Response(comments.data)
    

class Create_comment(APIView):
    def post(self, request):
        ## how to get post object?
        data = request.data.copy()
        print(data)
        data['comment_user'] = request.user.id

    

        new_comment = CreateCommentSerializer(data=data)
        if new_comment.is_valid():
            new_comment.save()
            return Response(new_comment.data, status=HTTP_201_CREATED)
        else:
            return Response(new_comment.errors, status=HTTP_400_BAD_REQUEST)

