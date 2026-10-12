from django.db import models


class Offer(models.Model):
    code = models.CharField(max_length=40, unique=True)
    description = models.CharField(max_length=200)
    discount_percent = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code
