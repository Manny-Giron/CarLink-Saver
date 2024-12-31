from django.shortcuts import render
import os
from django.conf import settings
from django.http import HttpResponse

def serve_react(request):
    """
    Serves the React frontend application from the build folder.
    """
    # Locate the React index.html file
    file_path = os.path.join(settings.BASE_DIR, 'build', 'index.html')
    if not os.path.exists(file_path):
        return HttpResponse(f"React index.html not found at: {file_path}", status=404)

    # Render the index.html file
    return render(request, 'index.html')
