from typing_extensions import Required
from django.db import models

# Create your models here.
class Mountain(models.Model):
  resort = models.CharField(max_length=50, default=None)
  sub_resort = models.CharField(max_length=50, default=None)
  location_car = models.CharField(max_length=250, default=None)
  location_car_fr = models.CharField(max_length=250, default=None, null=True)
  location_car_de = models.CharField(max_length=250, default=None, null=True)
  location_bus = models.CharField(max_length=250, default=None)
  car_score = models.PositiveIntegerField(default=None, null=True)
  bus_score = models.PositiveIntegerField(default=None, null=True)
  piste = models.CharField(max_length=250, default=None, null=True)
  piste_fr = models.CharField(max_length=250, default=None, null=True)
  piste_de = models.CharField(max_length=250, default=None, null=True)
  piste_score = models.PositiveIntegerField(default=None)
  off_piste = models.CharField(max_length=250, default=None)
  off_piste_fr = models.CharField(max_length=250, default=None, null=True)
  off_piste_de = models.CharField(max_length=250, default=None, null=True)
  off_piste_score = models.PositiveIntegerField(default=None)
  lunch = models.CharField(max_length=250, default=None)
  lunch_fr = models.CharField(max_length=250, default=None, null=True)
  lunch_de = models.CharField(max_length=250, default=None, null=True)
  lunch_score = models.PositiveIntegerField(default=None)
  breadth = models.CharField(max_length=250, default=None)
  breadth_score = models.PositiveIntegerField(default=None)
  blue_bird_score = models.PositiveIntegerField(default=None, null=True)
  overcast_score = models.PositiveIntegerField(default=None, null=True)
  white_out_score = models.PositiveIntegerField(default=None, null=True)
  weather_comment = models.CharField(max_length=250, default=None, null=True)
  weather_comment_fr = models.CharField(max_length=250, default=None, null=True)
  weather_comment_de = models.CharField(max_length=250, default=None, null=True)
  other = models.CharField(max_length=250, default=None)
  other_fr = models.CharField(max_length=250, default=None, null=True)
  other_de = models.CharField(max_length=250, default=None, null=True)
  bus_route = models.PositiveIntegerField(default=None)
  bus_map = models.CharField(max_length=250, default=None)
  ski_map = models.CharField(max_length=250, default=None)
  ski_price = models.CharField(max_length=250, default=None)
  red_runs = models.PositiveIntegerField(default=None, null=True)
  blue_runs = models.PositiveIntegerField(default=None, null=True)
  black_runs = models.PositiveIntegerField(default=None, null=True)
  image_1 = models.CharField(max_length=250, default=None, null=True)
  image_2 = models.CharField(max_length=250, default=None, null=True)
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