from rest_framework import viewsets, permissions
from .models import HeroBanner
from .serializers import HeroBannerSerializer


class HeroBannerViewSet(viewsets.ModelViewSet):
    queryset = HeroBanner.objects.filter(is_active=True)
    serializer_class = HeroBannerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
