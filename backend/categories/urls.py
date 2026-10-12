from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SubcategoryViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='category')
router.register('subcategories', SubcategoryViewSet, basename='subcategory')

urlpatterns = router.urls
