from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
from django.middleware.csrf import get_token
from django.http import JsonResponse

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message' : 'User account successfully made. Log in now.'}, status=status.HTTP_201_CREATED)
        # If account could not be made, we return HTTP 400 status code
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)