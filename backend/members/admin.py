from django.contrib import admin
from .models import Member

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'member_type', 'institution', 'email', 'created_at']
    list_filter = ['member_type']
    search_fields = ['name', 'institution', 'email']
