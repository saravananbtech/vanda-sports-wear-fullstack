from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Profile
from .serializers import RegisterSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def patch(self, request):
        profile, _ = Profile.objects.get_or_create(user=request.user)
        for field in ['phone', 'whatsapp', 'address', 'city', 'state', 'pincode']:
            if field in request.data:
                setattr(profile, field, request.data[field])
        profile.save()
        return Response(UserSerializer(request.user).data)
