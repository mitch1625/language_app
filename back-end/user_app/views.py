from django.shortcuts import render
from .serializers import User, UserSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404


class SignUp(APIView):
    def post(self,request):
        try:
            data = request.data.copy()
            data['username'] = request.data['email']
            new_user = User.objects.create_user(**data)
            new_token = Token.objects.create(user=new_user)
            return Response(
                {"email": new_user.email, "token": new_token.key},
                status=HTTP_201_CREATED
            )
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        
class Log_in(APIView):
    def post(self, request):
        data = request.data
        user = authenticate(username = data.get("email"), password = data.get('password'))
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({"user": user.email, "token": token.key})
        return Response("Improper Credentials", status=HTTP_404_NOT_FOUND)
        

class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class Info(UserPermissions):
    def get(self, request):
        user = UserSerializer(request.user)
        return Response(user.data)
    
    def put(self, request):
        user = UserSerializer(request.user, data=request.data, partial=True)
        if user.is_valid():
            user.save()
            return Response(user.data)
        return Response(user.errors, status=HTTP_400_BAD_REQUEST)
    
class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)

  
class Language_list(APIView):
    def get(self, request):
        languages = User.LANGUAGE_CHOICES
        return Response(languages)
    

class Update_email(UserPermissions):
    def put(self,request):
        user = get_object_or_404(User, id=request.user.id)
        ser_user = UserSerializer(user, data=request.data, partial=True)
        if ser_user.is_valid():
            ser_user.save()
            return Response(ser_user.data, status=HTTP_200_OK)
        return Response(status=HTTP_400_BAD_REQUEST)