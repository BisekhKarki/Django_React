from django.shortcuts import render
from rest_framework.decorators import api_view  
from .models import UserModel
from .serializers import UserModelSerializer,UserLoginSeralizers
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
@api_view(['GET','POST'])
def user(request):
    if request.method == 'GET':
        users = UserModel.objects.all()
        userSerializer = UserModelSerializer(users,many=True).data
        
        return Response({
            "success":True,
            "message":userSerializer
        },status=status.HTTP_200_OK)
    elif request.method == "POST":
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        checkUserExists = UserModel.objects.filter(email=email).first()
        if checkUserExists:
            return Response({
            "success":False,
            "message":"User already exists",
            },status=status.HTTP_400_BAD_REQUEST)
        
        serializer  = UserModelSerializer(data=request.data)
        if serializer .is_valid():
            serializer .save()

            return Response({
                "success":True,
                "message":"User Created Successfully"
            },status=status.HTTP_201_CREATED)
        return Response({
            "success":False,
            "message":"Failed to add values",
            "errors": serializer.errors
        },status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    serializer = UserLoginSeralizers(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data

        # Generate the JWT token
        refresh = RefreshToken.for_user(user)

        return Response({
            "success": True,
            "message": "Login successful",
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),

        },status=status.HTTP_200_OK)
    
    return Response({
        "success": False,
        "errors": serializer.errors
    }, status=status.HTTP_401_UNAUTHORIZED)