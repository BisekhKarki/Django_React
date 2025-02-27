from django.urls import path
from .views import ListCreateQuiz, QuizzQuestion, RetriveUpdateDestroyQuiz, QuizzQuestionDetail

urlpatterns=[
    path("",ListCreateQuiz.as_view(), name="quiz_List"),
    path("<int:quiz_id>/",RetriveUpdateDestroyQuiz.as_view(), name="quiz_detail"),
    path("question/<int:quiz_id>/",QuizzQuestion.as_view(), name="questions"),
    path("question/<int:pk>/",QuizzQuestionDetail.as_view(), name="questions_detail"),
]   