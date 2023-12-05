from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v
from django.core.validators import validate_email
from .validators import validate_name

class User(AbstractUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=150,
        unique=True,
        validators=[validate_email]
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


    ENGLISH = 'English'
    KOREAN = 'Korean'
    SPANISH = 'Spanish'         # Create variables for error prevention and logic seperation
    LANGUAGE_CHOICES = [        # Easy to adjust when refactoring/changing code
        (ENGLISH, "English"),   
        (KOREAN, 'Korean'),
        (SPANISH, "Spanish")
    ]

    ## Create a seperate Profile model??
    first_name = models.CharField(max_length=255, blank=True, null=True, validators=[validate_name])
    last_name = models.CharField(max_length=255, blank=True, null=True, validators=[validate_name])
    native_language = models.CharField(choices=LANGUAGE_CHOICES)        
    display_name = models.CharField(max_length=50, blank=True, null=True, validators=[])
    premium_account = models.BooleanField(default=False)
    