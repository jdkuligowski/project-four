from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

# custom imports
from .models import Resort
from .serializers.common import ResortSerializer
from .serializers.populated import PopulatedResortSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class ResortListView(APIView):
  

  # GET - Return lsit of all resorts
  def get(self, _request):
    resorts = Resort.objects.all()
    serialized_resorts = PopulatedResortSerializer(resorts, many=True)
    return Response(serialized_resorts.data, status=status.HTTP_200_OK)

  # POST - Add a resort to the database
  permission_classes = (IsAuthenticatedOrReadOnly, )
  def post(self,request):
    
    deserialized_resort = ResortSerializer(data=request.data)
    try:
      deserialized_resort.is_valid()
      deserialized_resort.save()
      return Response(deserialized_resort.data, status.HTTP_201_CREATED)
    except Exception as e:
      print(type(e))
      print(e)
      return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)



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

    # PUT - Update record
    def put(self, request, pk):
        resort_to_update = self.get_resort(pk=pk)
        print(type(resort_to_update))
        deserialized_resort = ResortSerializer(resort_to_update, request.data)
        try:
            deserialized_resort.is_valid()
            deserialized_resort.save()
            return Response(deserialized_resort.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

    # DELETE - Remove an item from the resrts table
    def delete(self, _request, pk):
        print('PK ->', pk)
        resort_to_delete=self.get_resort(pk)
        resort_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

