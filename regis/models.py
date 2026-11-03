from django.db import models

# Create your models here.
class registration(models.Model):
    
    username = models.CharField(max_length=50)
    name = models.CharField(max_length=100)
    ROLE_CHOICE = [
        ('H','HOST'),
        ('P','PARTICIPANT'),
    ]
    role = models.CharField(max_length=1, choices=ROLE_CHOICE)

    password = models.CharField(null=False)

