from django.db import models

# Create your models here.
class Resort(models.Model):
  resort = models.CharField(max_length=50, default=None)
  country = models.CharField(max_length=50, default=None)
  mountain_range = models.CharField(max_length=50, default=None)
  total_length = models.PositiveIntegerField(default=None)
  base = models.PositiveIntegerField(default=None)
  peak = models.PositiveIntegerField(default=None)
  size_range = models.PositiveIntegerField(default=None)
  beginner = models.PositiveIntegerField(default=None)
  intermediate = models.PositiveIntegerField(default=None)
  expert = models.PositiveIntegerField(default=None)
  mountain_range = models.CharField(max_length=250, default=None) # blank=True)
  mountain_image = models.CharField(max_length=250, default=None, null=True)
  resort_image = models.CharField(max_length=250, default=None, null=True)
  restaurant_summary = models.CharField(max_length=300, default=None, null=True)
  mountain_detail = models.ManyToManyField(
        'mountains.Mountain',
        related_name='resorts',
        blank=True
    )
  resort_restaurants = models.ManyToManyField(
        'restaurants.Restaurant',
        related_name='resorts',
        blank=True
  )
  owner = models.ManyToManyField(
        'jwt_auth.User',
        related_name='resorts',
        # on_delete=models.CASCADE,
        blank=True
    )



  def __str__(self):
    return f"{self.resort} ({self.base}m) - {self.country}"