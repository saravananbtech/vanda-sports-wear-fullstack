from rest_framework import serializers
from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'product', 'product_name', 'customer_name', 'rating', 'text', 'is_approved', 'created_at']
        read_only_fields = ['is_approved']
