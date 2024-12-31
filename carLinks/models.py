from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class CarLink(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) # Associate with a User
    title = models.CharField(max_length=200) # The Title used for the car links\
    cost = models.IntegerField(max_length=200) # Cost of vehicle
    url = models.URLField(max_length=200) # url == link to listing
    imgURL = models.URLField(max_length=200) # Link of image of vehicle to display
    notes = models.TextField(max_length=200) # Description if applicable
    timeFetched = models.DateTimeField(auto_now_add=True) # Timestamp addded
    listedDate = models.CharField(max_length=200) # Date listed, in format mm/dd/yyyy
    
    def __str__(self):
        return self.title


