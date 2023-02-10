from django.db import models

# User model
class User(models.Model):
    name  = models.CharField(max_length = 200, null = False, blank = False)
    phone_num  = models.CharField(max_length = 200, null = False, blank = False)
    password  = models.TextField()
    donor = models.BooleanField()
    inventory = models.TextField(blank = True)
    address = models.TextField()
    
    def __str__(self):
        return self.name

# Food requests model
class Request(models.Model):
    recepient_id = models.IntegerField(null = False)
    donor_id = models.IntegerField(null = False)
    food = models.TextField(null = False)
    is_accepted = models.BooleanField(default = False)

    def __str__(self):
        return self.food
