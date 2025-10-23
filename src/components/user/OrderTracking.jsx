import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, MapPin, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

export default function OrderTracking() {
  const { orderId } = useParams();

  const orderDetails = {
    id: orderId,
    date: new Date().toISOString().split("T")[0],
    status: "shipped",
    estimatedDelivery: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
    items: [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 4999,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      phone: "+92 300 1234567",
      address: "123 Main Street, Block A",
      city: "Karachi",
      postalCode: "75500",
    },
    payment: {
      method: "Cash on Delivery",
      total: 4999,
    },
  };

  const steps = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been confirmed",
      icon: Package,
      completed: true,
      date: orderDetails.date,
    },
    {
      id: 2,
      title: "Processing",
      description: "We are preparing your order",
      icon: Clock,
      completed: true,
      date: orderDetails.date,
    },
    {
      id: 3,
      title: "Shipped",
      description: "Your order is on the way",
      icon: Truck,
      completed:
        orderDetails.status === "shipped" ||
        orderDetails.status === "delivered",
      date:
        orderDetails.status === "shipped" ||
        orderDetails.status === "delivered"
          ? orderDetails.date
          : null,
    },
    {
      id: 4,
      title: "Delivered",
      description: "Order delivered successfully",
      icon: CheckCircle,
      completed: orderDetails.status === "delivered",
      date:
        orderDetails.status === "delivered"
          ? orderDetails.estimatedDelivery
          : null,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="mb-2">Track Your Order</h2>
          <p className="text-gray-600">Order ID: {orderId}</p>
        </div>

        {/* Order Status Timeline */}
        <Card className="p-6 md:p-8 mb-8">
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex items-start gap-4 md:gap-6 pb-8 last:pb-0">
                  {/* Icon & Line */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed
                          ? "bg-[#FF6600] text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <step.icon className="w-6 h-6" />
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-1 h-full mt-2 ${
                          step.completed
                            ? "bg-[#FF6600]"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                    className="flex-1 pb-4"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3
                          className={`text-lg ${
                            step.completed
                              ? "text-[#FF6600]"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {step.description}
                        </p>
                      </div>
                      {step.date && (
                        <Badge
                          variant={
                            step.completed ? "default" : "secondary"
                          }
                        >
                          {step.date}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#FFD580]/20 rounded-lg flex items-center gap-3">
            <Truck className="w-5 h-5 text-[#FF6600]" />
            <p className="text-sm">
              <span>Estimated Delivery: </span>
              <span className="text-[#FF6600]">
                {orderDetails.estimatedDelivery}
              </span>
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Items */}
          <Card className="p-6">
            <h3 className="mb-4">Order Items</h3>
            <div className="space-y-4">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-[#FF6600]">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Shipping Address */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF6600]" />
              Shipping Address
            </h3>
            <div className="space-y-2 text-sm">
              <p>{orderDetails.shippingAddress.name}</p>
              <p className="text-gray-600">
                {orderDetails.shippingAddress.phone}
              </p>
              <p className="text-gray-600">
                {orderDetails.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.postalCode}
              </p>
            </div>
          </Card>

          {/* Payment Info */}
          <Card className="p-6">
            <h3 className="mb-4">Payment Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span>{orderDetails.payment.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-[#FF6600]">
                  Rs. {orderDetails.payment.total.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="p-6">
            <h3 className="mb-4">Need Help?</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full">
                Report an Issue
              </Button>
              <Button
                asChild
                className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
              >
                <Link to="/user/products">Continue Shopping</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
