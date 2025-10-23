import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { products } from "../mockData";
import { toast } from "sonner";

export default function ProductDetail({ cartItems, setCartItems, wishlist, setWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2>Product not found</h2>
        <Button onClick={() => navigate("/user/products")} className="mt-4">
          Continue Shopping
        </Button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const addToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    toast.success("Added to cart!");
  };

  const buyNow = () => {
    addToCart();
    navigate("/user/checkout");
  };

  const toggleWishlist = () => {
    if (wishlist.find((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast.success("Removed from wishlist");
    } else {
      setWishlist([...wishlist, product]);
      toast.success("Added to wishlist");
    }
  };

  const isInWishlist = wishlist.find((item) => item.id === product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg mb-4"
          >
            <div className="aspect-square relative group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-[#FF6600] text-white">
                  -{product.discount}% OFF
                </Badge>
              )}
            </div>
          </motion.div>
        </div>

        {/* Product Details */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge className="mb-2">{product.category}</Badge>
            <h1 className="mb-4 text-2xl font-semibold">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl text-[#FF6600]">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <span className="text-xl text-gray-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-green-600 flex items-center gap-2">
                <Check className="w-5 h-5" />
                In Stock ({product.stock} available)
              </p>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-6 py-2">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="px-4"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-gray-600">
                  {product.stock > 10
                    ? "Available"
                    : `Only ${product.stock} left!`}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                onClick={buyNow}
                className="flex-1 bg-[#FF6600] hover:bg-[#FF6600]/90 py-6"
              >
                Buy Now
              </Button>
              <Button
                onClick={addToCart}
                variant="outline"
                className="flex-1 border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white py-6"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={toggleWishlist}
                variant="outline"
                className="px-6 py-6"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-[#FF6600]" />
                <p className="text-sm">Free Delivery</p>
              </Card>
              <Card className="p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-[#FF6600]" />
                <p className="text-sm">Secure Payment</p>
              </Card>
              <Card className="p-4 text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-[#FF6600]" />
                <p className="text-sm">Easy Returns</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <Card className="p-6 mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <h3 className="mt-6">Product Features</h3>
              <ul>
                <li>High quality materials</li>
                <li>Durable and long-lasting</li>
                <li>Easy to use and maintain</li>
                <li>Comes with manufacturer warranty</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-600">{key}</span>
                  <span>{value}</span>
                </div>
              ))}
              <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Brand</span>
                <span>{product.brand}</span>
              </div>
              <div className="flex justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Stock</span>
                <span>{product.stock} units</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <Card key={review} className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#FF6600] rounded-full flex items-center justify-center text-white">
                      U{review}
                    </div>
                    <div>
                      <p>User {review}</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Great product! Highly recommended. The quality is excellent
                    and it arrived quickly.
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="mb-6 text-xl font-semibold">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  className="overflow-hidden hover:shadow-2xl transition-shadow group cursor-pointer"
                  onClick={() =>
                    navigate(`/user/product/${relatedProduct.id}`)
                  }
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {relatedProduct.discount > 0 && (
                      <Badge className="absolute top-3 left-3 bg-[#FF6600] text-white">
                        -{relatedProduct.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF6600]">
                        Rs. {relatedProduct.price.toLocaleString()}
                      </span>
                      {relatedProduct.discount > 0 && (
                        <span className="text-gray-400 line-through text-sm">
                          Rs. {relatedProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
