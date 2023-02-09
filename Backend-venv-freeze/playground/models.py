from django.db import models

# Create your models here.
class addUser(models.Model):
    first_name  = models.CharField(max_length = 200, null = False, blank = False)
    last_name = models.CharField(max_length = 200, null = False, blank = False)
    phone_num  = models.CharField(max_length = 200, null = False, blank = False)
    pass_word  = models.TextField(null = False)
    donor = models.BooleanField(null = False)
    need_inventory = False
    if(donor):
        need_inventory = True
    inventory = models.TextField(null = need_inventory)
    address = models.TextField(null = False)
    
    def __str__(self):
        return self.name


class send_request(models.Model):
    receiver_id = models.TextField()
    food = models.TextField()
    donor_id = models.TextField()
    accepted = models.BooleanField()
    def __str__(self):
        return self.receiver_id