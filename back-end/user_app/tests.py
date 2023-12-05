from django.test import TestCase
from django.core.exceptions import ValidationError
from user_app.models import User
import re

## Need to figure out username problem
class user_test(TestCase):
    def test_01_valid_name(self):
        user = User(
            email='eric@gmail.com',
            password = '123',
            first_name = 'Eric',
            last_name = 'Mitchell',
            native_language= User.ENGLISH,
            display_name = "mitch"
            )
        try:
            user.full_clean()
            self.assertIsNotNone(user)
        except ValidationError as e:
            print(e)
            self.fail()