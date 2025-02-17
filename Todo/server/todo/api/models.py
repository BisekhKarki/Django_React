from django.db import models

# Create your models here.
class Todo(models.Model):
    name= models.CharField(max_length=100)
    date = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    

class UserModel(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.TextField(max_length=100)

    def __str__(self):
        return self.username
