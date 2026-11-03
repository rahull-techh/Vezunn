from . import views
from django.urls import path,include


urlpatterns = [
    path('',views.home,name = "Home"),
    path('registration/',views.regis, name = "Registration"),
    path('login/',views.login_user,name="Login"),
]
