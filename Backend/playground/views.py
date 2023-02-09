from django.shortcuts import render
from django.http import HttpResponse
from .models import addUser
#view folder is a request handler


def singUp(request):
    if request.METHOD == 'POST':
        username = request.POST['name']
        phone_num = request.POST['phone_num']
        password = request.POST['password']
        inventory = request.POST['inventory']
        address = request.POST['address']

        new_user = addUser(name = username, phone_num = phone_num, password = password, inventory = inventory, address = address)