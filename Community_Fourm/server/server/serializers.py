from rest_framework import serializers
from .models import UserModel,Article,Category,Comment,Like
from django.contrib.auth.hashers import make_password,check_password



class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'password','created_at', 'updated_at')

    def create(self,validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)



class UserLoginSeralizers(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self,data):
        email = data.get('email')
        password = data.get('password')
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exists")

        if not check_password(password,user.password):
            raise serializers.ValidationError("Invalid credentials. Please try again")

        return user
    
# Minimal User Serializer to exclude sensitive data
class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['id', 'username']  # Only include public fields


# Category models serializers
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name','description']


# Article serialiers
class ArticleSerializer(serializers.ModelSerializer):
    author = UserPublicSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Article
        fields = ['id','title','content','author','category','images','created_at','updated_at']




# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    article = serializers.PrimaryKeyRelatedField(queryset=Article.objects.all())
    
    class Meta:
        model = Comment
        fields = ['id', 'user', 'article', 'content', 'created_at']


# Like Serializer
class LikeSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    article = serializers.PrimaryKeyRelatedField(queryset=Article.objects.all())

    class Meta:
        model = Like
        fields = ['id','user','article','created_at']