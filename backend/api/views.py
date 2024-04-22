from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics 
from .serializers import UserSerializer, GoalSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Goal
# Create your views here.

#class for creating goals
class GoalCreate(generics.ListCreateAPIView):
    serializer_class=GoalSerializer
    permission_classes=[IsAuthenticated] #has to be authenticated
    
    def get_queryset(self):
        user=self.request.user
        print(user)
        return Goal.objects.filter(author=user) #filters for goals made by the current user
    def perform_create(self,serializer):
        #we want to do some custom creating here so we have to override the default
        if serializer.is_valid():
            serializer.save(author=self.request.user)
            #manualy checks that the new instance passes serializer checks and adds a value to the author property of the current user
        else:
            print(serializer.errors)
            #fails we print the errors
#class for deleting goals    
class GoalDelete(generics.DestroyAPIView):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]
    
    #specifies that you can only delete if you are the other
    def get_queryset(self):
        user=self.request.user
        return Goal.objects.filter(author=user) 

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class=UserSerializer
    permission_classes = [AllowAny] #anyone can create