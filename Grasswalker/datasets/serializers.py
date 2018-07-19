from django.contrib.auth.models import User
from datasets.models import Lab, Folder, Dataset
from rest_framework import serializers


class UserFilteredPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(UserFilteredPrimaryKeyRelatedField, self).get_queryset()
        if not request or not queryset:
            return None
        return queryset.filter(user=request.user)


class LabFilteredPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(LabFilteredPrimaryKeyRelatedField, self).get_queryset()
        if not request or not queryset:
            return None
        user = request.user
        lab = user.profile.lab
        return queryset.filter(owner=lab)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ()

class LabModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        exclude = ()


class FolderModelSerializer(serializers.ModelSerializer):
    owner = LabFilteredPrimaryKeyRelatedField(queryset=Lab.objects,required=False)
    parent = LabFilteredPrimaryKeyRelatedField(queryset=Folder.objects,required=False)
    class Meta:
        model = Folder
        exclude = ()


class DatasetModelSerializer(serializers.ModelSerializer):
    folder = LabFilteredPrimaryKeyRelatedField(queryset=Folder.objects,required=False)
    class Meta:
        model = Dataset
        exclude = ()

