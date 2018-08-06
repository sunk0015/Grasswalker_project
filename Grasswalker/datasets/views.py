from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from datasets.models import Lab, Dataset, Folder, MethodologyTemplate
from django.contrib.auth.models import User
from . import serializers
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from itertools import chain, product

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
        if 'folderid' in self.kwargs:
            folders =  [Folder.objects.get(id=int(self.kwargs['folderid']))]
        queryset = []
        for folder in folders:
            queryset += Dataset.objects.filter(folder=folder)
        return queryset

class LabPrivateDatasetView(generics.RetrieveAPIView):
    permissions_class=(IsAuthenticated)
    queryset = Dataset.objects.all()
    serializer_class = serializers.DatasetModelSerializer

    def get_object(self):
        if 'datasetid' in self.kwargs:
            return Dataset.objects.get(id=int(self.kwargs['datasetid']))
        return None

class LabPrivateDatasetDelete(generics.DestroyAPIView):
    permissions_class=(IsAuthenticated)

    def destroy(self, request, *args, **kwargs):
        pk = request.POST['datasetid']
        instance = Dataset.objects.filter(id=int(pk))
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()



class LabPrivateFolderList(generics.ListCreateAPIView):
    permissions_class=(IsAuthenticated)
    queryset = Folder.objects.all()
    serializer_class = serializers.FolderModelSerializer

    def get_queryset(self):
        user = self.request.user
        lab = user.profile.lab
        params = self.request.GET
        if 'folderid' in self.kwargs:
            return Folder.objects.filter(owner=lab).filter(parent=int(self.kwargs['folderid']))
        return Folder.objects.filter(owner=lab).filter(parent=None)

    def perform_create(self,serializer):
        return serializer.save(owner=self.request.user.profile.lab)


class LabPrivateProjectList(generics.ListCreateAPIView):
    permissions_class=(IsAuthenticated)
    queryset = Folder.objects.all()
    serializer_class = serializers.FolderModelSerializer

    def get_queryset(self):
        user = self.request.user
        lab = user.profile.lab
        return Folder.objects.filter(owner=lab).filter(parent=None)

    def perform_create(self,serializer):
        return serializer.save(owner=self.request.user.profile.lab)

class LabPrivateProjectDelete(generics.DestroyAPIView):
    permissions_class=(IsAuthenticated)

    def destroy(self, request, *args, **kwargs):
        pk = request.POST['projectid']
        instance = Folder.objects.filter(id=pk)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()


class LabPrivateTemplateList(generics.ListCreateAPIView):
    permissions_class=(IsAuthenticated)
    queryset = MethodologyTemplate.objects.all()
    serializer_class = serializers.MethodologyTemplateSerializer

    def get_queryset(self):
        user = self.request.user
        lab = user.profile.lab
        return MethodologyTemplate.objects.filter(owner=lab)

    def perform_create(self,serializer):
        return serializer.save(owner=self.request.user.profile.lab)


class LabPrivateTemplateDelete(generics.DestroyAPIView):
    permissions_class=(IsAuthenticated)

    def destroy(self, request, *args, **kwargs):
        pk = request.POST['templateid']
        instance = MethodologyTemplate.objects.filter(id=pk)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance):
        instance.delete()

class LabPrivateTemplateView(generics.RetrieveAPIView):
    permissions_class=(IsAuthenticated)
    queryset = MethodologyTemplate.objects.all()
    serializer_class = serializers.MethodologyTemplateSerializer

    def get_object(self):
        if 'templateid' in self.kwargs:
            return MethodologyTemplate.objects.get(id=int(self.kwargs['templateid']))
        return None

class SearchDatasetListView(generics.ListAPIView):
    query_set = Dataset.objects.all()
    serializer_class = serializers.DatasetModelSerializer

    def get_queryset(self):
        if 'query' in self.kwargs:
            query = self.kwargs['query']
            datasets = Dataset.objects.filter(Q(title__icontains=query) | Q(abstract__icontains=query))
            return datasets
        else:
            return None

class SearchFolderListView(generics.ListAPIView):
    query_set = Folder.objects.all()
    serializer_class = serializers.FolderModelSerializer

    def get_queryset(self):
        if 'query' in self.kwargs:
            query = self.kwargs['query']
            folders = Folder.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
            return folders
        else:
            return None


