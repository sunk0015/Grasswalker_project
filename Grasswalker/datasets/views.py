from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from datasets.models import Lab, Dataset, Folder
from django.contrib.auth.models import User
from . import serializers

"""Generic views accessible across app (i.e. no filters)"""
class UserList(generics.ListCreateAPIView):
    permissions_class = (IsAuthenticated)
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer

class LabList(generics.ListCreateAPIView):
    permissions_class=(IsAuthenticated)
    queryset = Lab.objects.all()
    serializer_class = serializers.LabModelSerializer


"""Lab based views (i.e. filtered by user's Lab)"""
class UserPrivateLab(generics.ListAPIView):
    """gets user's lab"""
    permissions_class=(IsAuthenticated)
    queryset = Lab.objects.all()
    serializer_class = serializers.LabModelSerializer

    def get_queryset(self):
        user = self.request.user
        lab = user.profile.lab
        return [lab]

class LabPrivateDatasetList(generics.ListCreateAPIView):
    permissions_class=(IsAuthenticated)
    queryset = Dataset.objects.all()
    serializer_class = serializers.DatasetModelSerializer

    def get_queryset(self):
        user = self.request.user
        lab = user.profile.lab
        folders = Folder.objects.filter(owner=lab)
        queryset = []
        for folder in folders:
            queryset += Dataset.objects.filter(folder=folder)
        return queryset


class LabPrivateFolderList(generics.ListCreateAPIView):
    permissions_class=(IsAuthenticated)
    queryset = Folder.objects.all()
    serializer_class = serializers.FolderModelSerializer

    def get_queryset(self):
        user = self.request.user
        lab = user.profile.lab
        return Folder.objects.filter(owner=lab)

class LabPrivateProjectList(generics.ListCreateAPIView):
    permissions_class=(IsAuthenticated)
    queryset = Folder.objects.all()
    serializer_class = serializers.FolderModelSerializer

    def get_queryset(self):
        user = self.request.user
        lab = user.profile.lab
        return Folder.objects.filter(owner=lab).filter(parent=None)