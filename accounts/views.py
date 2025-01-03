from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.middleware.csrf import get_token
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, UserRegistrationSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    # Custom login view to handle email-based authentication.
    serializer_class = CustomTokenObtainPairSerializer


def get_csrf_token(request):

    # Endpoint to retrieve CSRF token.

    return JsonResponse({'csrfToken': get_token(request)})


class RegisterAPIView(APIView):
    # Endpoint to register a new user.

    def post(self, request):
        # Handles user registration by validating the input and creating the user.

        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'message': 'User account successfully made. Log in now.'},
                status=status.HTTP_201_CREATED
            )
        # Return HTTP 400 with error details if validation fails
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
