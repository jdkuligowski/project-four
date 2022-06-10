from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

# custom imports
from .models import Resort
from .serializers.common import ResortSerializer
from .serializers.populated import PopulatedResortSerializer


# Create your views here.
class ResortListView(APIView):


  # GET - Return lsit of all resorts
  def get(self, _request):
    resorts = Resort.objects.all()
    serialized_resorts = PopulatedResortSerializer(resorts, many=True)
    return Response(serialized_resorts.data, status=status.HTTP_200_OK)



class ResortDetailView(APIView):

    # CUSTOM FUNCTION
    def get_resort(self, pk):
        try:
            return Resort.objects.get(pk=pk)
        except Resort.DoesNotExist as e:
            print(e)
            raise NotFound({ 'detail': str(e) })

    # GET - Return 1 item from the resorts table
    def get(self, _request, pk):
        resort = self.get_resort(pk)
        print('resort --->', resort)
        serialized_resort = PopulatedResortSerializer(resort)
        return Response(serialized_resort.data, status.HTTP_200_OK)