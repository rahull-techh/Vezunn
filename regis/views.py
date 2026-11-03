from django.shortcuts import render
from django.urls import path,include
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password 

# Create your views here.

def home(request):
    return render(request,"UI_F.html")

@csrf_exempt
def regis(request):

    if request.method == "GET":
        return render(request,"auth2.html")

    if request.method != "POST":
        return JsonResponse({"error":"POST request required"},status=400)

    full_nm = request.POST.get("full_nm")
    username = request.POST.get("username")
    role = request.POST.get("role")
    password = request.POST.get("password")
    

    if not full_nm or not username or not role or not password:
        return JsonResponse({"error1":"All Fields are required"}, status = 400)

    if not('@' in password or '$' in password) and any(c.isdigit() for c in password) and any(c.isalpha() for c in password):
        return JsonResponse({"error2":"Create a strong password using @,$ and a combination of digits and alphabets"})


    hashed_pwd = make_password(password)

    user = User.objects.create(
        username = username,
        name = full_nm,
        password= hashed_pwd,
        is_active = False,
    )

    return JsonResponse({"message":"Registration Successfull"},status=200)


@csrf_exempt
def login_user(request):

    if request.method != "POST":
        return JsonResponse({"error":"POST method required"},status=405)

    username = request.POST.get("username")
    password = request.POST.get("password")

    if not username:
        return JsonResponse({"error":"Please enter the username"},status=405)
    if not password:
        return JsonResponse({"error":"Please enter the password"},status=405)

    user = authenticate(request, username=username , password=password)


    if user is None:
        return JsonResponse({"error":"Invalid username or password"},status=405)

    return JsonResponse({"message":"Login successfull, Welcome to VEZUN🤖",
                         "username":user.username},status=200)


    

    

