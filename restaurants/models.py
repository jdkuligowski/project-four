from django.db import models

# Create your models here.
class Restaurant(models.Model):
  resort = models.CharField(max_length=100, default=None)
  name = models.CharField(max_length=100, default=None)
  area = models.CharField(max_length=100, default=None)
  food_drink = models.CharField(max_length=100, default=None)
  cuisine = models.CharField(max_length=100, default=None)
  type = models.CharField(max_length=100, default=None)
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