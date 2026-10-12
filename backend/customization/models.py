from django.db import models

TEAM_ORDER_STATUS = [
    ('design_review', 'Design Review'),
    ('in_production', 'In Production'),
    ('shipped', 'Shipped'),
    ('delivered', 'Delivered'),
]


class Package(models.Model):
    name = models.CharField(max_length=150)
    includes = models.CharField(max_length=200, help_text='e.g. "Jersey + Shorts"')
    price = models.DecimalField(max_digits=8, decimal_places=2, help_text='Price per jersey')
    badge = models.CharField(max_length=40, blank=True)
    image = models.ImageField(upload_to='packages/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return self.name


class TeamOrder(models.Model):
    package = models.ForeignKey(Package, related_name='team_orders', on_delete=models.SET_NULL, null=True)
    customer_name = models.CharField(max_length=150)
    mobile = models.CharField(max_length=20, blank=True)
    whatsapp = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    address = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    pincode = models.CharField(max_length=10, blank=True)
    team_name = models.CharField(max_length=150)
    logo = models.ImageField(upload_to='team_logos/', blank=True, null=True)
    reference_image = models.ImageField(upload_to='team_references/', blank=True, null=True)
    primary_color = models.CharField(max_length=10, default='#D4AF37')
    secondary_color = models.CharField(max_length=10, default='#0B0B0B')
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    status = models.CharField(max_length=20, choices=TEAM_ORDER_STATUS, default='design_review')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.team_name} ({self.get_status_display()})'


class Player(models.Model):
    team_order = models.ForeignKey(TeamOrder, related_name='players', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    number = models.CharField(max_length=10, blank=True)
    jersey_size = models.CharField(max_length=6, default='M')
    shorts_size = models.CharField(max_length=6, blank=True)
    role = models.CharField(max_length=60, blank=True)

    def __str__(self):
        return f'{self.name} #{self.number}'
