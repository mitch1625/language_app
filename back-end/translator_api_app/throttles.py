from rest_framework.throttling import UserRateThrottle
from rest_framework.views import APIView


class TierThrottle(UserRateThrottle):
    def allow_request(self, request, view):
        user = request.user
        if user.premium_account == False:
            self.rate = '10/day'
        elif user.premium_account == True:
            self.rate = '100/day'

        self.num_requests, self.duration = self.parse_rate(self.rate)
        return super().allow_request(request, view)