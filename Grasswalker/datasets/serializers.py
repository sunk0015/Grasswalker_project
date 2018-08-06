from django.contrib.auth.models import User
from datasets.models import Lab, Folder, Dataset, MethodologyTemplate
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
    name = serializers.CharField(max_length=100,allow_blank=False)
    description = serializers.CharField(max_length=5000,allow_blank=False)
    class Meta:
        model = Folder
        exclude = ()

    def create(self,validated_data):
        lab = self.context['view'].request.user.profile.lab
        if 'parent' not in validated_data:
            # Project instance not Folder instance
            validated_data['parent']=None
        print(validated_data)
        validated_data['owner'] = lab
        return Folder.objects.create(**validated_data)

class DatasetModelSerializer(serializers.ModelSerializer):
    folder = LabFilteredPrimaryKeyRelatedField(queryset=Folder.objects,required=False)
    class Meta:
        model = Dataset
        exclude = ()

    def create(self, validated_data):
        print(validated_data)
        return Dataset.objects.create(**validated_data)

class MethodologyTemplateSerializer(serializers.ModelSerializer):
    owner = LabFilteredPrimaryKeyRelatedField(queryset=Lab.objects,required=False)
    name = serializers.CharField(max_length=100,allow_blank=False)
    content = serializers.CharField(max_length=5000,allow_blank=False)
    class Meta:
        model = MethodologyTemplate
        exclude = ()

class GlobalSearchSerializer(serializers.Serializer):
    datasets = DatasetModelSerializer(many=True)
    folders = FolderModelSerializer(many=True)
