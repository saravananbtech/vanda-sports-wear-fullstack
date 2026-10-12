from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True)
    gradient = models.CharField(max_length=200, blank=True, default='linear-gradient(150deg,#241f13,#0f0d08)')
    icon = models.CharField(max_length=40, blank=True, default='shirt')
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120)
    image = models.ImageField(upload_to='subcategories/', blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ('category', 'slug')
        ordering = ['name']
        verbose_name_plural = 'Subcategories'

    def __str__(self):
        return f'{self.category.name} / {self.name}'
