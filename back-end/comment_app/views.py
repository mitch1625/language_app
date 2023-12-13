from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CommentSerializer, Comment


class All_comments(APIView):
    def get(self, request):
        comments = CommentSerializer(Comment.objects.order_by('id'), many=True)
        return Response(comments.data)
    

class Create_comment(APIView):
    pass