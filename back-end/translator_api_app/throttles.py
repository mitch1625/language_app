from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView

class UserType(UserRateThrottle):
    def allow_request(self, request, view):
        # Get the user type from the user object
        user_type = getattr(request.user, 'premium_account', None)
        print(user_type)       
        if user_type == False:
            request.scope = 'user'
            print(request.scope)
        else:
            print('user premium is true')
            request.scope = 'basicuser'
        return super().allow_request(request,view)
    