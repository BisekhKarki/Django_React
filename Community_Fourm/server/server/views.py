from django.shortcuts import render
from rest_framework.decorators import api_view ,permission_classes
from .models import UserModel,Article,Category,Comment,Like
from .serializers import UserModelSerializer,UserLoginSeralizers, ArticleSerializer, CommentSerializer, Like, CategorySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import IsAuthenticated


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
        accessToken = AccessToken.for_user(user)
    
        return Response({
            "success": True,
            "message": "Login successful",
            "access_token": str(accessToken),

        },status=status.HTTP_200_OK)
    
    return Response({
        "success": False,
        "errors": serializer.errors
    }, status=status.HTTP_401_UNAUTHORIZED)



@api_view(['POST'])
def verify_token(request):
    permission_classes = [IsAuthenticated]
    if permission_classes:
        # print(AccessToken(token=token))
        return Response({"success": True, "message": "Token is valid"}, status=status.HTTP_200_OK)
    else:  
        return Response({"success": False, "message": "Invalid Token", "error": "Unauthenticated"}, status=status.HTTP_401_UNAUTHORIZED)
    


@api_view(['GET'])
def get_all_articles(request):
    articles = Article.objects.all()
    serializers = ArticleSerializer(articles,many=True,context={"request": request})
    return Response({"success": True, "message": serializers.data}, status=status.HTTP_200_OK)