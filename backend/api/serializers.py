from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Goal

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id','title','about','complete_by','created_at', 'author']
        extra_kwargs = {"author":{"read_only":True}} #sets the author prop to be read only
