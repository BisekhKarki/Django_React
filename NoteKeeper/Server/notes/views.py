from django.shortcuts import render
from .models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


# Create your views here.
@api_view(["GET"])
def search_notes(request):
    query = request.query_params.get("search")
    notes = Note.objects.filter(Q(title_icontains=query) | Q(body_icontains=query) | Q(category_icontains=query))
    seralizer = NoteSerializer(notes,many=True)
    return Response(seralizer.data, status=status.HTTP_200_OK)




@api_view(['GET','POST'])
def notes(request):
    if request.method == 'GET':
        notes = Note.objects.all()
        serializer = NoteSerializer(notes,many=True)
        return Response({
            'success': True,
            'message': "Notes retrieved successfully",
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': "Note created successfully",
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)


        return Response({
            'success': False,
            'message': "Note creation unsuccessful",
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET','PUT','DELETE'])
def note_details(request,slug):
    try:
        note = Note.objects.get(slug=slug)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = NoteSerializer(note,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    