from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import TodoSerializer,UserModelSerializer,LoginSerializer
from .models import Todo,UserModel
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


# Create your views here.
@api_view(['GET'])
def todo_view(request):
    todo = Todo.objects.all()
    serializer = TodoSerializer(todo,many=True).data
    return Response(serializer)


@api_view(['POST'])
def add_todo(request):
    values = request.data
    seralizer = TodoSerializer(data=values)
    if seralizer.is_valid():
        seralizer.save()
        return Response(seralizer.data,status=status.HTTP_201_CREATED)
    return Response(seralizer.data,status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def delete_todo(request,pk):
    todo = Todo.objects.get(pk=pk)
    if request.method == "DELETE":
        todo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
        

@api_view(['PUT'])
def edit_todo(request,pk):
    todo = Todo.objects.get(pk=pk)
    editingTodo = request.data
    serializer = TodoSerializer(todo,data=editingTodo)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def show_user(request):
    users = UserModel.objects.all()
    serializer = UserModelSerializer(users,many=True)
    return Response(serializer.data,  status=status.HTTP_200_OK)


@api_view(['POST'])
def register_user(request):
    user = request.data
    userEmail = user.get("email")
    if UserModel.objects.filter(email=userEmail).exists():
        return Response({"error":"User with the email already exists"},status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserModelSerializer(data=user)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    return Response(serializer.errors,  status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    userDetail = request.data
    serializer = LoginSerializer(data=userDetail)
    if not serializer.is_valid():
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    email = request.data['email']
    password = request.data['password']
    # user_object = authenticate(email=email,password=password)
    user_object = UserModel.objects.get(email=email)
    print(user_object.id)
    
    if user_object and user_object.password == password:
        token, _ = Token.objects.get_or_create(user=user_object)
        return Response({
            'status':True,
            'data':{
                'token':str(token)
            }
        })
    
    return Response({
            'status':False,
            'data':"",
            'message':"Invalid Credentials"
        })
    
    