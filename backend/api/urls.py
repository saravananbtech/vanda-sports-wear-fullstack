from django.urls import path, include

urlpatterns = [
    path('', include('accounts.urls')),
    path('', include('categories.urls')),
    path('', include('products.urls')),
    path('', include('orders.urls')),
    path('', include('customization.urls')),
    path('', include('offers.urls')),
    path('', include('banners.urls')),
    path('', include('reviews.urls')),
    path('', include('contact.urls')),
    path('', include('dashboard.urls')),
    path('', include('media_manager.urls')),
]
