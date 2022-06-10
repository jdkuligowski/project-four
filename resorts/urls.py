from django.urls import path
from .views import ResortDetailView, ResortListView

urlpatterns = [
  path('', ResortListView.as_view()),
  path('<int:pk>/', ResortDetailView.as_view())
]