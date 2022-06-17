from django.db import models

# Create your models here.
class Translation(models.Model):
  page = models.CharField(max_length=50, default=None)
  section = models.CharField(max_length=50, default=None)
  language_id = models.PositiveIntegerField(default=None)
  english = models.CharField(max_length=500, default=None, null=True)
  french = models.CharField(max_length=500, default=None, null=True)
  german = models.CharField(max_length=500, default=None, null=True)

  def __str__(self):
    return f"{self.language_id} - {self.page} ({self.section})"