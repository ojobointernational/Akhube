from django.conf import settings
from rest_framework import serializers
from .models import Product


# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = [
#             "id", "name", "price", "description", "image",
#             "stock", "tax_percent", "is_active", "created_at", "updated_at"
#         ]
#         read_only_fields = ("created_at", "updated_at")


# class ProductSerializer(serializers.ModelSerializer):
#     image = serializers.ImageField(read_only=True, use_url=True)

#     class Meta:
#         model = Product
#         fields = ["id", "name", "price","description", "image", "stock", "tax_percent", "is_active", "created_at", "updated_at" ]

         
# class ProductSerializer(serializers.ModelSerializer):
#     image = serializers.SerializerMethodField()

#     class Meta:
#         model = Product
#         fields = "__all__"

#     def get_image(self, obj):
#         request = self.context.get("request")
#         if obj.image and request:
#             #return request.build_absolute_uri(obj.image.url)
#             return f"{settings.STATIC_URL}products/{obj.image}"
        
#         return None

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_image(self, obj):
        if obj.image:  # obj.image is filename like 'apple.jpeg'
            # Build URL relative to STATIC_URL
             return f"{settings.MEDIA_URL}{obj.image}"
        return None

