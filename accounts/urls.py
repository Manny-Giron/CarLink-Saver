from django.urls import path, include
from .views import get_csrf_token, RegisterAPIView

urlpatterns = [
    # API endpoint for registration
    path('csrf/', get_csrf_token, name='csrf_token'),
    path('register/', RegisterAPIView.as_view(), name='register'),  
]
