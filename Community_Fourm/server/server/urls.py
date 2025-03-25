from django.urls import path
from . import views

urlpatterns=[
    path("users/",views.user,name='get_user'),
    path("users/login/",views.login_user,name='login_user'),
]