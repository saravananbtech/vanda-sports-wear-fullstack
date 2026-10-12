from django.contrib import admin
from .models import Package, TeamOrder, Player


class PlayerInline(admin.TabularInline):
    model = Player
    extra = 0


@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'badge', 'is_active']


@admin.register(TeamOrder)
class TeamOrderAdmin(admin.ModelAdmin):
    list_display = ['team_name', 'package', 'total', 'status', 'created_at']
    list_filter = ['status']
    inlines = [PlayerInline]
