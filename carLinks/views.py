from django.shortcuts import render, redirect
from .forms import RegisterForm
from django.contrib import messages
from django.shortcuts import render

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Account created successfully! You can now log in.")
            return redirect('login')  # Redirect to login page
    else:
        form = RegisterForm()
    return render(request, 'links/register.html', {'form': form})
