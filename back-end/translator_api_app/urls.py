from django.urls import path
from .views import Translator

urlpatterns = [
    path("", Translator.as_view(), name='translator')
]