from django.db import models
from django.contrib.auth.models import User

# Create your models here.


# Many to One relationship between user and petprofile
# If user is deleted so is their pet profile
class PetProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pet_name = models.CharField(max_length=20, default='nameless')
    pet_type = models.CharField(max_length=20, default='unknown')