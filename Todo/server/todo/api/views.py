from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import TodoSerializer
from .models import Todo


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