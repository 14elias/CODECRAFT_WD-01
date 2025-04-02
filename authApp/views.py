from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response=super().post(request, *args, **kwargs)
            access_token=response.data.get('access')
            refresh_token=response.data.get('refresh')

            if not access_token or not refresh_token:
                return Response({"error": "Token generation failed"}, status=status.HTTP_400_BAD_REQUEST)

            # Create response object
            res = Response({
                "message": "Login successful",
            }, status=status.HTTP_200_OK)

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                samesite="None",
                secure=True,
                path="/",
            )

            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                samesite="None",
                secure=True,
                path="/",
            )

            return res
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            response=super().post(request, *args, **kwargs)

            access_token=response.data.get('access')

            if not access_token:
                return Response(
                    {"error": "Invalid or expired refresh token"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Securely store access token in HTTP-only cookie
            res = Response(status=status.HTTP_204_NO_CONTENT) 

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                path='/',
                samesite='None'
            )

            return res
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )