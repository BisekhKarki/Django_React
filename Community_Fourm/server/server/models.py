from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser


# Models for the projects are User, Article, Comment, Upvote and Category

# Create your models here.
class UserModel(models.Model):
    username = models.CharField(max_length=50,unique=False)
    email= models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def set_password(self,raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return self.username
    