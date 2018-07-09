from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Folder(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100,null=True)
    description = models.TextField(max_length=5000,null=True)

    def __str__(self):
        return self.name

class Dataset(models.Model):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    title = models.CharField(max_length=100,null=True)
    date = models.DateTimeField(null=True)
    abstract = models.TextField(max_length=5000,null=True)
    file = models.FileField(upload_to='datasets/',null=True)

    def __str__(self):
        return self.title
