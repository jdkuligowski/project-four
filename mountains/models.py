from typing_extensions import Required
from django.db import models

# Create your models here.
class Mountain(models.Model):
  resort = models.CharField(max_length=50, default=None)
  sub_resort = models.CharField(max_length=50, default=None)
  location_car = models.CharField(max_length=250, default=None)
  location_bus = models.CharField(max_length=250, default=None)
  location_score = models.PositiveIntegerField(default=None)
  piste = models.CharField(max_length=250, default=None)
  piste_score = models.PositiveIntegerField(default=None)
  off_piste = models.CharField(max_length=250, default=None)
  off_piste_score = models.PositiveIntegerField(default=None)
  lunch = models.CharField(max_length=250, default=None)
  lunch_score = models.PositiveIntegerField(default=None)
  breadth = models.CharField(max_length=250, default=None)
  breadth_score = models.PositiveIntegerField(default=None)
  other = models.CharField(max_length=250, default=None)
  bus_route = models.PositiveIntegerField(default=None)
  bus_map = models.CharField(max_length=250, default=None)
  ski_map = models.CharField(max_length=250, default=None)
  ski_price = models.CharField(max_length=250, default=None)
  car_park = models.CharField(max_length=250, default=None)
  mountain_lunch = models.ManyToManyField(
        'mountains.Lunch', 
        related_name='mountains',
        blank=True
    )

  def __str__(self):
      return f"{self.sub_resort} ({self.resort})"

class Lunch(models.Model): 
  mountain_area = models.CharField(max_length=50, default=None)
  restaurant_name = models.CharField(max_length=100, default=None)
  lift_near = models.CharField(max_length=50, default=None)
  price = models.CharField(max_length=50, default=None)
  lift_near = models.CharField(max_length=50, default=None)
  google_review = models.FloatField(default=None)
  cuisine = models.CharField(max_length=50, default=None)
  size = models.CharField(max_length=50, default=None)
  tips = models.CharField(max_length=50, default=None)


  def __str__(self):
      return f"{self.restaurant_name} ({self.mountain_area})"