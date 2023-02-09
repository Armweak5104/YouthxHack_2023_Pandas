from django.contrib import admin
from .models import User, Request

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    class Meta:
        model = User
        fields = ('id', 'name', 'phone_num', 'password', 'donor', 'inventory', 'address')

class RequestAdmin(admin.ModelAdmin):
    class Meta:
        model = Request
        fields = ('id', 'recepient_id', 'donor_id', 'food', 'is_accepted')

admin.site.register(User, UserAdmin)
admin.site.register(Request, RequestAdmin)