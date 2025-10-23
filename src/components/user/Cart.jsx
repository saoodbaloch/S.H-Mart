import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import React from "react";

export default function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(productId);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 150;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto p-12 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
          <h2 className="mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild className="bg-[#FF6600] hover:bg-[#FF6600]/90">
            <Link to="/user/products">Continue Shopping</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6">Shopping Cart ({cartItems.length} items)</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/user/product/${item.id}`}
                    className="flex-shrink-0"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link to={`/user/product/${item.id}`}>
                      <h3 className="text-sm mb-1 hover:text-[#FF6600] transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-[#FF6600]">
                        Rs. {item.price.toLocaleString()}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-gray-400 line-through text-sm">
                          Rs. {item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="px-4 py-1 text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        className="px-3"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <p className="text-sm">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h3 className="mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>
                  {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                </span>
              </div>
              {subtotal < 1000 && (
                <p className="text-xs text-gray-500">
                  Add Rs. {(1000 - subtotal).toLocaleString()} more for free
                  shipping
                </p>
              )}
              <Separator />
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-[#FF6600]">
                  Rs. {total.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              onClick={() => navigate("/user/checkout")}
              className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90 py-6 mb-4"
            >
              Proceed to Checkout
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link to="/user/products">Continue Shopping</Link>
            </Button>

            <div className="mt-6 p-4 bg-[#F5F5F5] rounded-lg">
              <h4 className="text-sm mb-2">We Accept</h4>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-white px-2 py-1 rounded">💳 Card</span>
                <span className="text-xs bg-white px-2 py-1 rounded">💵 COD</span>
                <span className="text-xs bg-white px-2 py-1 rounded">
                  📱 EasyPaisa
                </span>
                <span className="text-xs bg-white px-2 py-1 rounded">
                  📱 JazzCash
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
