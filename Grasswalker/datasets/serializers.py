from django.contrib.auth.models import User
from datasets.models import Folder, Dataset
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ()


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        exclude = ()


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        exclude = ()
