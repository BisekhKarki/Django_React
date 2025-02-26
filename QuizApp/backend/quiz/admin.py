from django.contrib import admin
from .models import Question, Quiz, Answer

# Register your models here.


class QuizAdmin(admin.ModelAdmin):
    list_display=['id','title']



class AnswerInlineModel(admin.TabularInline):
    model = Answer
    fields = ['answer_text',"is_right"]

class QuestionAdmin(admin.ModelAdmin):
    fields = ['title','quizz']
    list_display = ['title','quiz','created_at']
    inlines = [AnswerInlineModel]

class QuizAdmin(admin.ModelAdmin):
    list_display=['id','title']

class AnswerAdmin(admin.ModelAdmin):
    list_display = ['answer_text',"is_right",'question']




admin.site.register(Quiz,QuizAdmin)
admin.site.register(Question)
admin.site.register(Answer)