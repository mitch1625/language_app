from django.shortcuts import render
import requests
from rest_framework.response import Response
from rest_framework.views import APIView
from language_proj.settings import env
import base64


def get_auth_token():
    token_url = "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    client_id = env.get("PAYMENT_CLIENT_ID")
    secret_key = env.get("PAYMENT_KEY")

    response = requests.post(
        token_url,
        data = {'grant_type':"client_credentials"},
        auth = (client_id, secret_key)
    )
    access_token = response.json()['access_token']
    print(response.json())
    return access_token

class Subscription(APIView):
    def post(self, request):
        access_token = get_auth_token()
        print(access_token)
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'PayPal-Request-Id': 'PLAN-CUSTOM-PLAN',
            'Prefer': 'return=representation',
        }

        data = '{ "plan_id": "P-5ML4271244454362WXNWU5NQ", "start_time": "2018-11-01T00:00:00Z", "quantity": "20", "shipping_amount": { "currency_code": "USD", "value": "10.00" }, "subscriber": { "name": { "given_name": "John", "surname": "Doe" }, "email_address": "customer@example.com", "shipping_address": { "name": { "full_name": "John Doe" }, "address": { "address_line_1": "2211 N First Street", "address_line_2": "Building 17", "admin_area_2": "San Jose", "admin_area_1": "CA", "postal_code": "95131", "country_code": "US" } } }, "application_context": { "brand_name": "walmart", "locale": "en-US", "shipping_preference": "SET_PROVIDED_ADDRESS", "user_action": "SUBSCRIBE_NOW", "payment_method": { "payer_selected": "PAYPAL", "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED" }, "return_url": "https://example.com/returnUrl", "cancel_url": "https://example.com/cancelUrl" } }'

        response = requests.post('https://api-m.sandbox.paypal.com/v1/billing/plans', headers=headers, data=data)
        print(response)
        return Response(response.json())
    

    def get(self, request):
        access_token = get_auth_token()
        
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'PayPal-Request-Id': 'PLAN-CUSTOM-PLAN',
            'Prefer': 'return=representation',
        }
        params = (
                ('sort_by', 'create_time'),
                ('sort_order', 'desc'),
            )

        response = requests.get('https://api-m.sandbox.paypal.com/v1/billing/plans/2', headers=headers, params=params)
        return Response(response.json())