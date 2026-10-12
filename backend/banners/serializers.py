from rest_framework import serializers
from .models import HeroBanner


class HeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBanner
        fields = ['id', 'title', 'subtitle', 'image', 'cta_label', 'cta_link', 'is_active', 'order']
