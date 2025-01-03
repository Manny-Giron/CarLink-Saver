from django.urls import path
from .views import CustomTokenObtainPairView, get_csrf_token, RegisterAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # JWT authentication endpoints
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # API endpoint for registration
    path('csrf/', get_csrf_token, name='csrf_token'),
    path('register/', RegisterAPIView.as_view(), name='register'),  
]


