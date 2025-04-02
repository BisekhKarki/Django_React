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
    

# Category Model
class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

# Article Model
class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    author = models.ForeignKey(UserModel,on_delete=models.CASCADE, related_name="article")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='articles')
    images= models.ImageField(upload_to="media/article_images/",null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    


# Comment Model
class Comment(models.Model):
    user = models.ForeignKey(UserModel,on_delete=models.CASCADE,related_name="comments")
    article = models.ForeignKey(Article,on_delete=models.CASCADE,related_name="comments")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.user.username} on {self.article.title}'
    

# Like mode
class Like(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='likes')
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'article')  # Ensures one like per user per article

    def __str__(self):
        return f'Liked by {self.user.username} on {self.article.title}'
