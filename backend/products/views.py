from rest_framework import viewsets
from api.permissions import IsAdminOrReadOnly
from .models import Product, ProductImage
from .serializers import ProductSerializer, ProductImageSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category', 'subcategory').prefetch_related('images').filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'
    filterset_fields = ['category__slug', 'subcategory__slug', 'tag']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'rating', 'created_at']


class ProductImageViewSet(viewsets.ModelViewSet):
    """Upload/replace/delete individual product images (admin only)."""
    queryset = ProductImage.objects.select_related('product').all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAdminOrReadOnly]
    filterset_fields = ['product']

    def perform_create(self, serializer):
        instance = serializer.save()
        # Auto-flag the first image uploaded for a product as primary.
        if not ProductImage.objects.filter(product=instance.product, is_primary=True).exclude(id=instance.id).exists():
            instance.is_primary = True
            instance.save(update_fields=['is_primary'])
