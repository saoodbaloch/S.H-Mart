import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { adminOrders } from '../mockData';
import { toast } from 'sonner'; // ✅ version number hata diya

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState(adminOrders);

  // ✅ TypeScript hata diya
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} updated to ${newStatus}!`);
  };

  // ✅ TypeScript hata diya
  const filterOrders = (status) => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = status === 'all' || order.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  // ✅ TypeScript hata diya aur direct props se status le rahe hain
  const OrderTable = ({ status }) => {
    const filteredOrders = filterOrders(status);

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Order ID</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Items</th>
              <th className="text-left py-3 px-4">Amount</th>
              <th className="text-left py-3 px-4">Payment</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">{order.items} items</td>
                <td className="py-3 px-4 text-[#FF6600]">
                  Rs. {order.total.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline">{order.payment}</Badge>
                </td>
                <td className="py-3 px-4">
                  <Select
                    value={order.status}
                    onValueChange={(value) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">No orders found</div>
        )}
      </div>
    );
  };

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const shippedCount = orders.filter((o) => o.status === 'shipped').length;
  const deliveredCount = orders.filter((o) => o.status === 'delivered').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Order Management</h2>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search orders by ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <Card className="p-6">
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({shippedCount})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({deliveredCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <OrderTable status="all" />
          </TabsContent>
          <TabsContent value="pending">
            <OrderTable status="pending" />
          </TabsContent>
          <TabsContent value="shipped">
            <OrderTable status="shipped" />
          </TabsContent>
          <TabsContent value="delivered">
            <OrderTable status="delivered" />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
