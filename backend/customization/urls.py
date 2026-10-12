from rest_framework.routers import DefaultRouter
from .views import PackageViewSet, TeamOrderViewSet

router = DefaultRouter()
router.register('packages', PackageViewSet, basename='package')
router.register('team-orders', TeamOrderViewSet, basename='team-order')

urlpatterns = router.urls
