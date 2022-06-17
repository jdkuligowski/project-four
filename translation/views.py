from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Translation
from .serializers.common import TranslationSerializer


class TranslationListView(APIView):

    def get(self, _request):
        language = Translation.objects.all()
        serialized_languages=TranslationSerializer(language, many=True)
        return Response(serialized_languages.data, status=status.HTTP_200_OK)