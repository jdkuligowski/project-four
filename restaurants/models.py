from django.db import models

# Create your models here.
class Restaurant(models.Model):
  resort = models.CharField(max_length=100, default=None)
  name = models.CharField(max_length=100, default=None)
  area = models.CharField(max_length=100, default=None)
  area_fr = models.CharField(max_length=100, default=None, null=True)
  area_de = models.CharField(max_length=100, default=None, null=True)
  food_drink = models.CharField(max_length=100, default=None)
  food_drink_fr = models.CharField(max_length=100, default=None, null=True)
  food_drink_de = models.CharField(max_length=100, default=None, null=True)
  cuisine = models.CharField(max_length=100, default=None)
  cuisine_fr = models.CharField(max_length=100, default=None, null=True)
  cuisine_de = models.CharField(max_length=100, default=None, null=True)
  type = models.CharField(max_length=100, default=None)
  type_fr = models.CharField(max_length=100, default=None, null=True)
  type_de = models.CharField(max_length=100, default=None, null=True)
  contact = models.PositiveIntegerField(default=None)
  location = models.CharField(max_length=100, default=None)
  website = models.CharField(max_length=100, default=None)
  outdoor_image = models.CharField(max_length=250, default=None)
  indoor_image = models.CharField(max_length=250, default=None)
  price = models.FloatField(default=None)
  google_review = models.FloatField(default=None)
  opening_times = models.CharField(max_length=100, default=None)

  def __str__(self):
    return f"{self.name} - {self.area}"