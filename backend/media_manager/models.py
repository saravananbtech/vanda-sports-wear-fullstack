from django.db import models

ASSET_TYPES = [
    ('hero', 'Hero Banner'),
    ('category', 'Category Image'),
    ('offer', 'Offer Image'),
    ('package', 'Package Image'),
    ('general', 'General'),
]


class MediaAsset(models.Model):
    """
    Generic uploaded-image registry used by the admin's image manager
    (upload / replace / delete flow) for anything that isn't already tied
    to a specific model's ImageField.
    """
    file = models.ImageField(upload_to='assets/%Y/%m/')
    asset_type = models.CharField(max_length=20, choices=ASSET_TYPES, default='general')
    label = models.CharField(max_length=150, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.label or self.file.name
