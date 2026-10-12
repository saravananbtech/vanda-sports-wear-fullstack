from rest_framework import viewsets
from api.permissions import IsAdminOrReadOnly
from .models import Category, Subcategory
from .serializers import CategorySerializer, SubcategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.prefetch_related('subcategories').all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    filterset_fields = ['is_active']
    search_fields = ['name']


class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = Subcategory.objects.select_related('category').all()
    serializer_class = SubcategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['category', 'is_active']
