from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductSerializer



# class CartItemSerializer(serializers.ModelSerializer):
#     product_name = serializers.CharField(source='product.name', read_only=True)
#     price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)
#     tax_percent = serializers.DecimalField(source='product.tax_percent', max_digits=10, decimal_places=2, read_only=True)
#     class Meta:
#         model = CartItem
#         fields = '__all__'


# class CartSerializer(serializers.ModelSerializer):
#     items = CartItemSerializer(many=True)
#     subtotal = serializers.DecimalField(max_digits=10, decimal_places=2)
#     grand_total = serializers.DecimalField(max_digits=10, decimal_places=2)
#     class Meta:
#         model = Cart
#         fields = '__all__'
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "subtotal"]

    def get_subtotal(self, obj):
        return obj.product.price * obj.quantity


# class CartSerializer(serializers.ModelSerializer):
#     items = CartItemSerializer(source="cart_items", many=True)
#     total_price = serializers.SerializerMethodField()

#     class Meta:
#         model = Cart
#         fields = ["id", "items", "total_price"]

#     def get_total_price(self, obj):
#         return sum(
#             item.product.price * item.quantity
#             for item in obj.cart_items.all()
#         )
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)  # matches related_name
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "total_price"]

    def get_total_price(self, obj):
        return sum(
            item.product.price * item.quantity
            for item in obj.items.all()  # must match related_name
        )
