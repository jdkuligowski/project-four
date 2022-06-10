from django.urls import path
from .views import MountainListView

urlpatterns = [
  path('', MountainListView.as_view())
]