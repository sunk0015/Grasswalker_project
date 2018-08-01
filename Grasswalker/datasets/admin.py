from django.contrib import admin
from datasets.models import UserProfile, Lab, Folder, Dataset, MethodologyTemplate
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
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

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

admin.site.register(Lab)
admin.site.register(Folder)
admin.site.register(Dataset)
admin.site.register(MethodologyTemplate)
