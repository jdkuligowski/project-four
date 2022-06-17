from django.urls import path
from .views import TranslationListView

urlpatterns = [
  path('', TranslationListView.as_view())
]