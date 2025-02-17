from django.urls import path

from .views import todo_view,add_todo,delete_todo,edit_todo,register_user,show_user

urlpatterns = [
    path('',todo_view,name='view_todo'),
    path('create/',add_todo,name='add_todo'),
    path('delete/<int:pk>/',delete_todo,name='delete_todo'),
    path('edit/<int:pk>/',edit_todo,name='edit_todo'),
    path('register/',register_user,name='register'),
    path('getUser/',show_user,name='show_user'),
    # path('/login',register_user,name='login'),

]