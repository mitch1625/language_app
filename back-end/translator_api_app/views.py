from requests_oauthlib import OAuth2
import requests, uuid, json
from rest_framework.response import Response
from rest_framework.views import APIView
from language_proj.settings import env
from .throttles import TierThrottle
from rest_framework.decorators import throttle_classes

@throttle_classes([TierThrottle])
class Translator(APIView):
    # class_scope = [TierThrottle]
    def get(self, request, *args, **kwargs):
        # print(request.user.native_language)
        # Add your key and endpoint
        key = env.get("TRANSLATOR_KEY")
        endpoint = "https://api.cognitive.microsofttranslator.com"

        # location, also known as region.
        # required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
        location = env.get("TRANSLATOR_LOCATION")

        path = '/translate'
        constructed_url = endpoint + path
 
    

        params = {
            'api-version': '3.0',
            'from': request.query_params['from'],
            'to': request.user.native_language
        }

        headers = {
            'Ocp-Apim-Subscription-Key': key,
            # location required if you're using a multi-service or regional (not global) resource.
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4())
        }

        # You can pass more than one object in body.
        body = [{
            'text': request.query_params['body']
        }]

        request = requests.post(constructed_url, params=params, headers=headers, json=body)
        response = request.json()
        # print(response[0]['translations'][0]['text'])
        return Response(response[0]['translations'][0]['text'])
    

class LanguageDetection(APIView):
    def post(self, request):
        key = env.get("TRANSLATOR_KEY")
        location = env.get("TRANSLATOR_LOCATION")
        
        toDetect = request.data

        body = [toDetect]
        # print(body)
        # return Response(body)
        textLength = len(body[0]['Text'])

        constructed_url = "https://api.cognitive.microsofttranslator.com/detect?api-version=3.0"
        headers = {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4()),
            'Content-Length': str(textLength)
        }


        request = requests.post(constructed_url, headers=headers, json=body)
        response = request.json()
        # print(response[0]['language'])
        return Response(response[0]['language'])