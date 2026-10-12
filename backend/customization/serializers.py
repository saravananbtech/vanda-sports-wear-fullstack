from rest_framework import serializers
from django.db import transaction
from .models import Package, TeamOrder, Player


class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ['id', 'name', 'includes', 'price', 'badge', 'image', 'is_active', 'order']


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name', 'number', 'jersey_size', 'shorts_size', 'role']


class TeamOrderSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True)
    package_name = serializers.CharField(source='package.name', read_only=True)

    class Meta:
        model = TeamOrder
        fields = [
            'id', 'package', 'package_name', 'customer_name', 'mobile', 'whatsapp', 'email',
            'address', 'state', 'city', 'pincode', 'team_name', 'logo', 'reference_image',
            'primary_color', 'secondary_color', 'total', 'status', 'players', 'created_at',
        ]
        read_only_fields = ['status']

    def validate_players(self, players):
        if len(players) < 10:
            raise serializers.ValidationError('Minimum 10 players required per team order.')
        return players

    @transaction.atomic
    def create(self, validated_data):
        players_data = validated_data.pop('players')
        team_order = TeamOrder.objects.create(**validated_data)
        for player in players_data:
            Player.objects.create(team_order=team_order, **player)
        return team_order
