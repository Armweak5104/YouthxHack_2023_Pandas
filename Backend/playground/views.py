from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import UserSerializer, RequestSerializer
from .models import User, Request
#view folder is a request handler

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    # Filter phone_num if given
    def get_queryset(self):
        queryset = User.objects.all()
        phone_num = self.request.query_params.get('phone_num', None)
        is_donor = self.request.query_params.get('is_donor', None)
        if phone_num is not None:
            queryset = User.objects.all().filter(phone_num=phone_num)
        elif is_donor is not None:
            queryset = User.objects.all().filter(donor=is_donor)
        return queryset

class RequestView(viewsets.ModelViewSet):
    serializer_class = RequestSerializer
    def get_queryset(self):
        queryset = Request.objects.all()
        recepient_id = self.request.query_params.get('recepient_id', None)
        donor_id = self.request.query_params.get('donor_id', None)
        if recepient_id is not None:
            queryset = Request.objects.all().filter(recepient_id=recepient_id)
        elif donor_id is not None:
            queryset = Request.objects.all().filter(donor_id=donor_id)
        return queryset

#def singUp(request):
#    if request.METHOD == 'POST':
#        username = request.POST['name']
#        phone_num = request.POST['phone_num']
#        password = request.POST['password']
#        inventory = request.POST['inventory']
#        address = request.POST['address']
#
#        new_user = addUser(name = username, phone_num = phone_num, password = password, inventory = inventory, address = address)
