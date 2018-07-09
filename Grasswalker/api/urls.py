from django.conf.urls import url, include
import datasets.views as views
urlpatterns = [
    # my views
    url(r'^list/$', views.ListDataset.as_view()),
    url(r'^rest_auth/', include('rest_auth.urls')),
    url(r'^rest_auth/registration/', include('rest_auth.registration.urls')),

]