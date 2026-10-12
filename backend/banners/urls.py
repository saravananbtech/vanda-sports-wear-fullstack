from rest_framework.routers import DefaultRouter
from .views import HeroBannerViewSet

router = DefaultRouter()
router.register('banners', HeroBannerViewSet, basename='banner')

urlpatterns = router.urls
