from rest_framework import serializers
from django.contrib.auth.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    # Name will be collected instead of username
    name = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password']

    #check if account / email already exists with a user
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value

    def create(self, validated_data):
        name = validated_data.pop('name')
        email = validated_data.get('email')
        password = validated_data.get('password')

        """ To prefent dupe username from similar email prefixes, 
        combine both prefix & name to make a more unique username for django"""
        email_prefix = email.split('@')[0]
        username = f"{email_prefix}_{name}".replace(" ", "_")  # Replace spaces with underscores

        # Incase username still is a dupe from another account, add a counter.
        base_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        # Save their name (assuming its their first name) to django's user first_name field
        user.first_name = name
        user.save()

        return user
