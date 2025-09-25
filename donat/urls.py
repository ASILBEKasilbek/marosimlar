from django.urls import path
from . import views

urlpatterns = [
    path("donate/click/", views.donate_redirect, name="donate_redirect"),
    path("donate/click/callback/", views.click_callback, name="click_callback"),
]
