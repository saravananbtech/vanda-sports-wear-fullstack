from rest_framework import serializers
from django.db import transaction
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'size', 'price', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'customer_name', 'email', 'phone', 'address', 'city', 'state', 'pincode',
            'subtotal', 'delivery_charge', 'total', 'status', 'payment_method', 'items', 'created_at',
        ]
        read_only_fields = ['user', 'status']

    @transaction.atomic
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
        return order
