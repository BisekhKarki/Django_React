from django.shortcuts import render
from rest_framework import generics
from .models import Room
from .serializers import RoomSerializer

# We are able to not only view all the rooms but also create a room on the view below
class RoomView(generics.CreateAPIView):
    queryset  = Room.objects.all()
    serializer_class = RoomSerializer







