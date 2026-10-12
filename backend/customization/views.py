from rest_framework import viewsets, permissions
from .models import Package, TeamOrder
from .serializers import PackageSerializer, TeamOrderSerializer


class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.filter(is_active=True)
    serializer_class = PackageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TeamOrderViewSet(viewsets.ModelViewSet):
    queryset = TeamOrder.objects.select_related('package').prefetch_related('players').all()
    serializer_class = TeamOrderSerializer
    permission_classes = [permissions.AllowAny]
    filterset_fields = ['status']
