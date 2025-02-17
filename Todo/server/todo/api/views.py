from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import TodoSerializer,UserModelSerializer
from .models import Todo,UserModel


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


# @api_view(['POST'])
# def login_user(request):
#     user = UserModel.objects.get(email=request.email)

#     if user.DoesNotExist:
#         return Response(status=status.HTTP_400_BAD_REQUEST)
       
#     return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    