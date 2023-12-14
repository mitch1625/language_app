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
from user_app.views import UserPermissions

class All_comments(UserPermissions):
    def get(self, request):
        comments = CommentSerializer(Comment.objects.order_by('id'), many=True)
        return Response(comments.data)
    

class Create_comment(UserPermissions):
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


class Post_Comments(UserPermissions):
    def get(self, request, post):
        c = Comment.objects.filter(post=post)
        # print(c)
        c_ser = CommentSerializer(c, many=True)
        # print(c_ser.data)
        sorted_list = sorted(c_ser.data, key=lambda i: i['id'])
        return Response (sorted_list)