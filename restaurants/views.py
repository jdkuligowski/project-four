from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# custom imports
from .models import Restaurant
from .serializers.common import RestaurantSerializer


# Create your views here.
class RestaurantListView(APIView):


  # GET - Return lsit of all resorts
  def get(self, _request):
    restaurants = Restaurant.objects.all()
    serialized_restaurants = RestaurantSerializer(restaurants, many=True)
    print('serialized data ->', serialized_restaurants.data)
    return Response(serialized_restaurants.data, status=status.HTTP_200_OK)