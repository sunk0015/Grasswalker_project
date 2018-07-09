from django.conf.urls import url, include
import datasets.views as views
urlpatterns = [
    # my views
    url(r'^list/$', views.ListDataset.as_view()),
]