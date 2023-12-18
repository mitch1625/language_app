from django.urls import path
from .views import Subscription

urlpatterns = [
    path("", Subscription.as_view(), name='billing_plans')
]