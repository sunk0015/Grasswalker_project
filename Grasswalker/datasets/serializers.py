from django.contrib.auth.models import User
from datasets.models import Lab, Folder, Dataset
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ()

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        exclude = ()


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        exclude = ()


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        exclude = ()
