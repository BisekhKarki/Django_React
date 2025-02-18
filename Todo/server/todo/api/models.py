from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Todo(models.Model):
    name= models.CharField(max_length=100)
    date = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

#  username = models.CharField(max_length=100,unique=True)
#     email = models.EmailField(max_length=100)
#     password = models.TextField(max_length=100)

class UserModel(AbstractUser):
   
    # username = models.CharField(max_length=100,unique=True)
    # email = models.EmailField(max_length=100)
    # password = models.TextField(max_length=100)

    def __str__(self):
        return self.username
