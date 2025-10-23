import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Banknote, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

export default function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 1000 ? 0 : 150;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    const orderId = `ORD-2024-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;

    toast.success("Order placed successfully!");
    setCartItems([]);
    navigate(`/user/orders/${orderId}`);
  };

  if (cartItems.length === 0) {
    navigate("/user/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6">Checkout</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping & Payment Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <Card className="p-6">
              <h3 className="mb-4">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Complete Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="House no, street, area"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    placeholder="54000"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <Card className="p-6">
              <h3 className="mb-4">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  {/* COD */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "cod" ? "border-[#FF6600] bg-[#FF6600]/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="cod" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Banknote className="w-5 h-5 text-[#FF6600]" />
                      <div>
                        <p>Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when you receive</p>
                      </div>
                    </Label>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "card" ? "border-[#FF6600] bg-[#FF6600]/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="card" id="card" />
                    <Label
                      htmlFor="card"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <CreditCard className="w-5 h-5 text-[#FF6600]" />
                      <div>
                        <p>Debit / Credit Card</p>
                        <p className="text-sm text-gray-600">Visa, Mastercard</p>
                      </div>
                    </Label>
                  </motion.div>

                  {/* EasyPaisa */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "easypaisa" ? "border-[#FF6600] bg-[#FF6600]/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="easypaisa" id="easypaisa" />
                    <Label
                      htmlFor="easypaisa"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Smartphone className="w-5 h-5 text-[#FF6600]" />
                      <div>
                        <p>EasyPaisa</p>
                        <p className="text-sm text-gray-600">Mobile wallet</p>
                      </div>
                    </Label>
                  </motion.div>

                  {/* JazzCash */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      paymentMethod === "jazzcash" ? "border-[#FF6600] bg-[#FF6600]/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="jazzcash" id="jazzcash" />
                    <Label
                      htmlFor="jazzcash"
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <Smartphone className="w-5 h-5 text-[#FF6600]" />
                      <div>
                        <p>JazzCash</p>
                        <p className="text-sm text-gray-600">Mobile wallet</p>
                      </div>
                    </Label>
                  </motion.div>
                </div>
              </RadioGroup>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-1">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 mb-4">
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
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="text-[#FF6600]">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90 py-6"
              >
                Place Order
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By placing your order, you agree to our terms and conditions
              </p>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
