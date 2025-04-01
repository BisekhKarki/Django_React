from django.urls import path
from . import views

urlpatterns=[
    path("users/",views.user,name='get_user'),
    path("users/login/",views.login_user,name='login_user'),
    path("users/verify/",views.verify_token,name='verify_token'),
    path("article/get/",views.get_all_articles,name='get_all_articles'),
]