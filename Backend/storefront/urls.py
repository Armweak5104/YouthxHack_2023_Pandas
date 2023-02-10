from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from playground import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')
router.register(r'requests', views.RequestView, 'request')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]