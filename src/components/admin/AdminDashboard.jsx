import { motion } from 'motion/react';
import { TrendingUp, ShoppingCart, Users, Package, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const stats = [
    {
      icon: DollarSign,
      label: 'Total Sales',
      value: 'Rs. 2,456,789',
      change: '+12.5%',
      isPositive: true,
      color: 'bg-green-500'
    },
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      isPositive: true,
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      label: 'Customers',
      value: '5,678',
      change: '+15.3%',
      isPositive: true,
      color: 'bg-purple-500'
    },
    {
      icon: Package,
      label: 'Products',
      value: '456',
      change: '+2.1%',
      isPositive: true,
      color: 'bg-[#FF6600]'
    }
  ];

  const monthlyData = [
    { month: 'Jan', sales: 45000, orders: 120 },
    { month: 'Feb', sales: 52000, orders: 145 },
    { month: 'Mar', sales: 48000, orders: 135 },
    { month: 'Apr', sales: 61000, orders: 168 },
    { month: 'May', sales: 55000, orders: 152 },
    { month: 'Jun', sales: 67000, orders: 189 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 45 },
    { name: 'Fashion', value: 25 },
    { name: 'Home', value: 15 },
    { name: 'Sports', value: 10 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#FF6600', '#000000', '#4A90E2', '#FFD580', '#F5F5F5'];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Ahmad Hassan', amount: 17998, status: 'pending', time: '2 min ago' },
    { id: 'ORD-002', customer: 'Fatima Khan', amount: 4999, status: 'shipped', time: '15 min ago' },
    { id: 'ORD-003', customer: 'Ali Raza', amount: 23997, status: 'delivered', time: '1 hour ago' },
    { id: 'ORD-004', customer: 'Sara Ahmed', amount: 12999, status: 'pending', time: '2 hours ago' },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sold: 234, revenue: 1169766 },
    { name: 'Smart Watch', sold: 189, revenue: 2456811 },
    { name: 'Running Shoes', sold: 156, revenue: 935844 },
    { name: 'Laptop Backpack', sold: 142, revenue: 354858 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Dashboard Overview</h2>
        <select className="px-4 py-2 border rounded-lg">
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge variant={stat.isPositive ? 'default' : 'secondary'} className={stat.isPositive ? 'bg-green-500' : 'bg-red-500'}>
                  {stat.isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl">{stat.value}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="p-6">
          <h3 className="mb-4">Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#FF6600" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders Chart */}
        <Card className="p-6">
          <h3 className="mb-4">Monthly Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#FF6600" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h3 className="mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <h3 className="mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="mb-1">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sold} sold</p>
                </div>
                <p className="text-[#FF6600]">Rs. {product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Recent Orders</h3>
          <a href="/admin/orders" className="text-[#FF6600] text-sm hover:underline">
            View All
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">Rs. {order.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <Badge
                      className={
                        order.status === 'delivered'
                          ? 'bg-green-500'
                          : order.status === 'shipped'
                          ? 'bg-blue-500'
                          : 'bg-yellow-500'
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
