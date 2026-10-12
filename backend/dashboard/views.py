from django.db.models import Sum, Count
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from orders.models import Order
from customization.models import TeamOrder
from products.models import Product
from categories.models import Category
from accounts.models import Profile
from contact.models import ContactMessage


@api_view(['GET'])
@permission_classes([IsAdminUser])
def dashboard_stats(request):
    store_revenue = Order.objects.aggregate(total=Sum('total'))['total'] or 0
    jersey_revenue = TeamOrder.objects.aggregate(total=Sum('total'))['total'] or 0
    orders_by_status = list(Order.objects.values('status').annotate(count=Count('id')))
    team_orders_by_status = list(TeamOrder.objects.values('status').annotate(count=Count('id')))

    return Response({
        'store_revenue': store_revenue,
        'jersey_revenue': jersey_revenue,
        'total_revenue': store_revenue + jersey_revenue,
        'order_count': Order.objects.count(),
        'jersey_order_count': TeamOrder.objects.count(),
        'product_count': Product.objects.count(),
        'category_count': Category.objects.count(),
        'customer_count': Profile.objects.count(),
        'unread_messages': ContactMessage.objects.filter(is_read=False).count(),
        'orders_by_status': orders_by_status,
        'team_orders_by_status': team_orders_by_status,
    })
