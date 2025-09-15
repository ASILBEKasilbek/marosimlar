from django.contrib import admin
from .models import Category, Profile, Event, Review, Favorite, RSVP, Notification

# ========================
# Category Admin
# ========================
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name',)
    ordering = ('name',)


# ========================
# Profile Admin
# ========================
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_provider', 'contact_email', 'phone')
    list_filter = ('is_provider',)
    search_fields = ('user__username', 'contact_email', 'phone')


# ========================
# Event Admin
# ========================
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'location', 'price', 'budget', 'created_at')
    list_filter = ('category', 'created_at', 'user')
    search_fields = ('title', 'description', 'location', 'user__username')
    prepopulated_fields = {"title": ("title",)}
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    readonly_fields = ('average_rating',)

    def average_rating(self, obj):
        return obj.average_rating()
    average_rating.short_description = 'Average Rating'


# ========================
# Review Admin
# ========================
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('event', 'user', 'rating', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('event__title', 'user__username', 'comment')
    ordering = ('-created_at',)


# ========================
# Favorite Admin
# ========================
@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'created_at')
    search_fields = ('user__username', 'event__title')
    ordering = ('-created_at',)


# ========================
# RSVP Admin
# ========================
@admin.register(RSVP)
class RSVPAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'guests', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username', 'event__title')
    ordering = ('-created_at',)


# ========================
# Notification Admin
# ========================
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'read', 'created_at')
    list_filter = ('read', 'created_at')
    search_fields = ('user__username', 'message')
    ordering = ('-created_at',)
