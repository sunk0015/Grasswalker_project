from django.db import models
from django.contrib.auth.models import User, Group
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.

class Lab(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    name = models.CharField(max_length=100,null=True,blank=True)
    description = models.TextField(max_length=5000,null=True,blank=True)
    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='profile',null=True,blank=True)
    lab = models.ForeignKey(Lab,on_delete=models.CASCADE,null=True,blank=True)
    def __str__(self):
        return str(self.user)+' '+str(self.lab)

class Folder(models.Model):
    owner = models.ForeignKey(Lab, on_delete=models.CASCADE,null=True,blank=True)
    name = models.CharField(max_length=100,null=True,blank=True)
    description = models.TextField(max_length=5000,null=True,blank=True)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='folder',on_delete=models.CASCADE)

    def __str__(self):
        if self.name:
            return self.name
        else:
            return "unnamed"

class Dataset(models.Model):
    owner = models.ForeignKey(Lab, on_delete=models.CASCADE,null=True,blank=True)
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    title = models.CharField(max_length=100,null=True,blank=True)
    date = models.DateTimeField(auto_now_add=True,null=True,blank=True)
    abstract = models.TextField(max_length=5000,null=True,blank=True)
    methodology = models.TextField(max_length=5000,null=True,blank=True)
    file = models.FileField(upload_to='datasets/test_data/',null=True,blank=True)

    def __str__(self):
        return self.title


class MethodologyTemplate(models.Model):
    owner = models.ForeignKey(Lab, on_delete=models.CASCADE,null=True,blank=True)
    name = models.CharField(max_length=100,null=True,blank=True)
    content = models.TextField(max_length=5000,null=True,blank=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=User)
def user_save(sender, **kwargs):
    print("user  was created")
    print(sender)
    print(kwargs)
    print(kwargs["instance"])

@receiver(post_save,sender=UserProfile)
def user_profile_save(sender,**kwargs):
    print("user profile was created")
    print(sender)
    print(kwargs)
    print(kwargs["instance"])