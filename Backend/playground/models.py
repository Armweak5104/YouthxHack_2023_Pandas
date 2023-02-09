from django.db import models

# Create your models here.
class addUser(models.Model):
    name  = models.CharField(max_length = 200, null = False, blank = False)
    phone_num  = models.CharField(max_length = 200, null = False, blank = False)
    password  = models.TextField()
    donor = models.BooleanField()
    inventory = models.TextField()
    address = models.TextField()
    
    def __str__(self):
        return self.name