from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import Post, PostSerializer

class All_posts(APIView):
    def get(self, request):
        posts = PostSerializer(Post.objects.order_by('id'), many=True)
        return Response(posts.data)