from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v
from django.core.validators import validate_email


class User(AbstractUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=150,
        unique=True,
        validators=[validate_email]
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


    ENGLISH = 'en'
    KOREAN = 'ko'
    SPANISH = 'es'         # Create variables for error prevention and logic seperation
    LANGUAGE_CHOICES = [        # Easy to adjust when refactoring/changing code
        (ENGLISH, "English"),   
        (KOREAN, 'Korean'),
        (SPANISH, "Spanish")
    ]

    ## Create a seperate Profile model??
    native_language = models.CharField(choices=LANGUAGE_CHOICES, blank=True, null=True)
    target_language = models.CharField(choices=LANGUAGE_CHOICES, blank=True, null=True)        
    display_name = models.CharField(max_length=50, blank=True, null=True, validators=[])
    premium_account = models.BooleanField(default=False)
    