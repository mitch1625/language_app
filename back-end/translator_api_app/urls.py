from django.urls import path
from .views import Translator, LanguageDetection

urlpatterns = [
    path("", Translator.as_view(), name='translator'),
    path("detect/", LanguageDetection.as_view(), name='detection'),
]