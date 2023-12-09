from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import Post, PostSerializer
from user_app.serializers import User, UserSerializer

class All_posts(APIView):
    def get(self, request):
        # user_target = request.user.target_language
        # p = Post.objects.filter()
        # print(p.poster.native_language)

        posts = PostSerializer(Post.objects.order_by('id'), many=True)
        # return Response(user.data)
        # data = {
        #     "posts" : posts.data,
        #     "user": user.data
        # }
        return Response(posts.data)
    


    ## use object.filter(target_language="")