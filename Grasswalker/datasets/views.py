from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from datasets.models import Dataset
from . import serializers


class ListDataset(generics.ListCreateAPIView):
    permissions_class=(IsAuthenticated)
    queryset = Dataset.objects.all()
    serializer_class = serializers.DatasetSerializer


class DetailDataset(generics.RetrieveUpdateDestroyAPIView):
    permissions_class=(IsAuthenticated)
    queryset = Dataset.objects.all()
    serializer_class = serializers.DatasetSerializer
