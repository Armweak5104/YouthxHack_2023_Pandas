from rest_framework import serializers
from .models import User, Request

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'phone_num', 'donor', 'address', 'inventory')

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ('id', 'recepient_id', 'donor_id', 'food', 'is_accepted')
