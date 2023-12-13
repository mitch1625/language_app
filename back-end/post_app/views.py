from rest_framework.views import APIView
from rest_framework.response import Response
<<<<<<< HEAD
from .serializers import Post, PostSerializer
from user_app.serializers import User, UserSerializer
=======
from .serializers import Post, PostSerializer, CreatePostSerializer
from user_app.serializers import User, UserSerializer
from user_app.views import UserPermissions
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)
>>>>>>> fa9053a7b360e13d41acced60c3f15ca79a8aac2

class All_posts(UserPermissions):
    def get(self, request):
<<<<<<< HEAD
        posts = PostSerializer(Post.objects.order_by('id'), many=True)

        user_target = request.user.target_language
        user_native = request.user.native_language
        users = User.objects.all().filter(native_language=user_target, target_language=user_native)
        
        # post = [user.user.all() for user in users if user.user.all()]
        # print(post)
        # ser_post = PostSerializer(post[0], many=True)
        # print(ser_post.data)
        return Response(posts.data)
    
=======
        # posts = PostSerializer(Post.objects.order_by('id'), many=True)

        user_target = request.user.target_language
        user_native = request.user.native_language


        users = User.objects.all().filter(native_language=user_target, target_language=user_native)
        post = [user.user.all() for user in users if user.user.all()]
        # print(post)

        result = []

        ser_post = PostSerializer(post[0], many=True)


        return Response(ser_post.data)
        return Response('')


class Create_post(UserPermissions):
    def post(self,request):
        data = request.data.copy()
        data['poster'] = request.user.id

        # print(request)
        # print(data)
        new_post = CreatePostSerializer(data=data)
        
        if new_post.is_valid():
            new_post.save()
            return Response(new_post.data, status=HTTP_201_CREATED)
        else:
            return Response(new_post.errors, status=HTTP_400_BAD_REQUEST)
>>>>>>> fa9053a7b360e13d41acced60c3f15ca79a8aac2
