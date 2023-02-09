from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import UserSerializer
from .models import User
#view folder is a request handler

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

#def singUp(request):
#    if request.METHOD == 'POST':
#        username = request.POST['name']
#        phone_num = request.POST['phone_num']
#        password = request.POST['password']
#        inventory = request.POST['inventory']
#        address = request.POST['address']
#
#        new_user = addUser(name = username, phone_num = phone_num, password = password, inventory = inventory, address = address)