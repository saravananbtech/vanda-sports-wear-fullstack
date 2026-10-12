from rest_framework import viewsets, permissions
from .models import Review
from .serializers import ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ['product', 'is_approved']

    def get_queryset(self):
        qs = Review.objects.select_related('product').all()
        if not (self.request.user.is_authenticated and self.request.user.is_staff):
            qs = qs.filter(is_approved=True)
        return qs
