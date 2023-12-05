from requests_oauthlib import OAuth1
import requests, uuid, json
from rest_framework.response import Response
from rest_framework.views import APIView
from language_proj.settings import env


class Translator(APIView):
    def get(self, request):
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
            'from': 'en',
            'to': ['KO', 'zu']
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
            'text': 'I would really like to drive your car around the block a few times!'
        }]

        request = requests.post(constructed_url, params=params, headers=headers, json=body)
        response = request.json()

        print(json.dumps(response, sort_keys=True, ensure_ascii=False, indent=4, separators=(',', ': ')))
        return Response(response)