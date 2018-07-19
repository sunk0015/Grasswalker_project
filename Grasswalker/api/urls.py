from django.conf.urls import url, include
import datasets.views as views
urlpatterns = [
    # my views
    url(r'^userlist/$', views.UserList.as_view()),
    url(r'^lablist/$', views.LabList.as_view()),
    url(r'^userlab/$', views.UserPrivateLab.as_view()),
    url(r'^datasetlist/$', views.LabPrivateDatasetList.as_view()),
    url(r'^projectlist/$', views.LabPrivateProjectList.as_view()),
    url(r'^folderlist/$', views.LabPrivateFolderList.as_view()),
    url(r'^rest_auth/', include('rest_auth.urls')),
    url(r'^rest_auth/registration/', include('rest_auth.registration.urls')),

]