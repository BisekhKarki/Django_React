from django.contrib import admin
from .models import UserModel,Article,Category,Comment,Like


# Register your models here.
admin.site.register(UserModel)
admin.site.register(Article)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Like)
