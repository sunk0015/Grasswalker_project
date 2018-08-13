from django.contrib import admin
from datasets.models import UserProfile, Lab, Folder, Dataset, MethodologyTemplate
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.admin import ModelAdmin
from django.contrib.auth.models import User


# Register your models here.
# admin.site.register(Owner)
class UserProfileInLine(admin.StackedInline):
    model = UserProfile
    can_delete = True
    verbose_name_plural = 'userprofile'

# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInLine, )


class DatasetAdmin(ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(owner=request.user.profile.lab)

class FolderAdmin(ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(owner=request.user.profile.lab)

class LabAdmin(ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(owner=request.user)

class MethodologyTemplateAdmin(ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(owner=request.user.profile.lab)

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Lab, LabAdmin)
admin.site.register(Folder, FolderAdmin)
admin.site.register(Dataset, DatasetAdmin)
admin.site.register(MethodologyTemplate, MethodologyTemplateAdmin)
