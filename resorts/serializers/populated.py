from .common import ResortSerializer 
from mountains.serializers.common import MountainSerializer 
from restaurants.serializers.common import RestaurantSerializer
from jwt_auth.serializers.common import UserSerializer

# defining our populated serializer
class PopulatedResortSerializer(ResortSerializer):
    mountain_detail = MountainSerializer(many=True)
    resort_restaurants = RestaurantSerializer(many=True)
    # owner = UserSerializer(many=True)