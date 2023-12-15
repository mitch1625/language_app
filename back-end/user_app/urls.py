from django.urls import path
from .views import SignUp, Log_in, Info, Log_out, Language_list, Update_email

urlpatterns = [
    path("signup/", SignUp.as_view(), name="signup"),
    path("login/", Log_in.as_view(), name='login'),
    path("info/", Info.as_view(), name="info"),
    path("logout/", Log_out.as_view(), name="logout"),
    path('languages/', Language_list.as_view(), name="languagelist"),
    path('updateemail/', Update_email.as_view(), name='update_email')
]