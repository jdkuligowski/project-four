from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# custom imports
from .models import Mountain, Lunch
from .serializers.common import MountainSerializer, LunchSerializer


# Create your views here.
class MountainListView(APIView):


  # GET - Return lsit of all mountains within resort
  def get(self, _request):
    mountains = Mountain.objects.all()
    serialized_mountains = MountainSerializer(mountains, many=True)
    print('serialized data ->', serialized_mountains.data)
    return Response(serialized_mountains.data, status=status.HTTP_200_OK)


class MountainLunchListView(APIView):

  def get(self, _request):
    lunches = Lunch.objects.all()
    serialized_lunches = LunchSerializer(lunches, many=True)
    return Response(serialized_lunches.data, status=status.HTTP_200_OK)