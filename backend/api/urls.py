from django.urls import path
from . import views

urlpatterns = [
    #create a goal
    path("goals/", views.GoalCreate.as_view(), name="get-goals"),
    #delete a goal, <int:pk> is basically a route param
    path("goals/delete/<int:pk>/", views.GoalDelete.as_view(), name="delete-goal"),
]