from django.shortcuts import render
from django.http import HttpResponse
from .models import addUser, send_request
#view folder is a request handler


def signUp(request):
    if request.METHOD == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        phone_num = request.POST['phone_num']
        password = request.POST['password']
        inventory = request.POST['inventory']
        address = request.POST['address']

        new_user = addUser(first_name = first_name,last_name = last_name, phone_num = phone_num, pass_word = password, inventory = inventory, address = address)

def send_req(request):
    if request.METHOD == 'POST':
        receiver_id = request.POST["receiver_id"]
        food = request.POST["food"]
        donor_id = request.POST["donor_id"]
        accepted = request.POST["acceptance"]
    
    new_request = send_request(receiver_id = receiver_id, food = food, donor_id = donor_id, accepted = accepted)