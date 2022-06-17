from rest_framework import serializers 
from ..models import Translation

class TranslationSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = Translation # define model to serialize from
        fields = '__all__' # fields can be a tuple of field names or __all__ to get all fields
