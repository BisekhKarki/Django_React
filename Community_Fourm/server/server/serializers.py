from rest_framework import serializers
from .models import UserModel
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