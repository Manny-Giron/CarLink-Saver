from django.urls import path, include
from .views import get_csrf_token, RegisterAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    # JWT authentication endpoints
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  
    
    # API endpoint for registration
    path('csrf/', get_csrf_token, name='csrf_token'),
    path('register/', RegisterAPIView.as_view(), name='register'),  
]
