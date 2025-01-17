"""
URL configuration for CarLinkSaver project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from .views import serve_react
from django.urls import path, include, re_path
#from carLinks.views import serve_react



urlpatterns = [
    path('admin/', admin.site.urls),
    #API endpoints for accounts
    path('api/accounts/', include('accounts.urls')),
    # path('api/', include('carLinks.urls')),  # API routes
    re_path(r'^.*$', serve_react),    # Match all other paths and serve React
]
