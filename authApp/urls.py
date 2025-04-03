from django.urls import path
from .views import *

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('', HomeView.as_view(), name='home_view'),
    path('register/', RegisterView.as_view(), name='register_view'),

]