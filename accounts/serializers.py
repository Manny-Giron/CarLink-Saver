from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

import logging
logger = logging.getLogger(__name__)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get("username")
        password = attrs.get("password")
        logger.info(f"Attempting login for email: {email}")

        try:
            user = User.objects.get(email=email)
            attrs["username"] = user.username
            logger.info(f"Mapped email {email} to username {user.username}")
        except User.DoesNotExist:
            logger.error(f"Login failed for email: {email}")
            raise AuthenticationFailed("Invalid email or password.")

        return super().validate(attrs)


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Accepts name and email, uses email as the username.
    """
    # Name will be collected instead of username
    name = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(write_only=True, required=True)

class Meta:
    model = User
    fields = ['name', 'email', 'password']

def validate_email(self, value):
    """
    Ensure email is unique.
    """
    if User.objects.filter(email=value).exists():
        raise serializers.ValidationError("An account with this email already exists.")
    return value

def create(self, validated_data):
    """
    Create a new user with email as username and store their name.
    """
    name = validated_data.pop('name')
    email = validated_data.get('email')
    password = validated_data.get('password')

    # Create user with email as username
    user = User.objects.create_user(
        username=email,
        email=email,
        password=password
    )

    # Save their name (assuming its their first name) to first_name
    user.first_name = name
    user.save()

    return user
