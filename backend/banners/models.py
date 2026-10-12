from django.db import models


class HeroBanner(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to='banners/')
    cta_label = models.CharField(max_length=60, blank=True, default='Shop Now')
    cta_link = models.CharField(max_length=200, blank=True, default='/')
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
