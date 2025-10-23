import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, Package } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function SalesAnalytics() {
  const dailySales = [
    { day: 'Mon', sales: 45000, orders: 23 },
    { day: 'Tue', sales: 52000, orders: 28 },
    { day: 'Wed', sales: 48000, orders: 25 },
    { day: 'Thu', sales: 61000, orders: 32 },
    { day: 'Fri', sales: 55000, orders: 29 },
    { day: 'Sat', sales: 67000, orders: 35 },
    { day: 'Sun', sales: 72000, orders: 38 },
  ];

  const weeklySales = [
    { week: 'Week 1', sales: 234000, profit: 45000 },
    { week: 'Week 2', sales: 298000, profit: 58000 },
    { week: 'Week 3', sales: 276000, profit: 52000 },
    { week: 'Week 4', sales: 345000, profit: 67000 },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 234, revenue: 1169766, trend: 'up' },
    { name: 'Smart Watch', sales: 189, revenue: 2456811, trend: 'up' },
    { name: 'Running Shoes', sales: 156, revenue: 935844, trend: 'down' },
    { name: 'Laptop Backpack', sales: 142, revenue: 354858, trend: 'up' },
    { name: 'Power Bank', sales: 128, revenue: 383872, trend: 'up' },
  ];

  const lowStockProducts = [
    { name: 'Smart Watch Series 6', stock: 5, status: 'critical' },
    { name: 'Wireless Headphones', stock: 12, status: 'low' },
    { name: 'LED Ring Light', stock: 8, status: 'critical' },
    { name: 'Coffee Maker', stock: 15, status: 'low' },
  ];

  return (
    <div className="space-y-6">
      <h2>Sales Analytics</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">Today's Sales</p>
            <Badge className="bg-green-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12%
            </Badge>
          </div>
          <p className="text-3xl mb-1">Rs. 72,000</p>
          <p className="text-sm text-gray-600">38 orders</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">This Week</p>
            <Badge className="bg-green-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8%
            </Badge>
          </div>
          <p className="text-3xl mb-1">Rs. 345,000</p>
          <p className="text-sm text-gray-600">182 orders</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">This Month</p>
            <Badge className="bg-green-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15%
            </Badge>
          </div>
          <p className="text-3xl mb-1">Rs. 1,453,000</p>
          <p className="text-sm text-gray-600">756 orders</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales */}
        <Card className="p-6">
          <h3 className="mb-4">Daily Sales (This Week)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#FF6600" fill="#FFD580" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Sales & Profit */}
        <Card className="p-6">
          <h3 className="mb-4">Weekly Sales & Profit</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#FF6600" />
              <Bar dataKey="profit" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Products & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <Card className="p-6">
          <h3 className="mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF6600] text-white rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <p className="mb-1">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#FF6600] mb-1">Rs. {product.revenue.toLocaleString()}</p>
                  {product.trend === 'up' ? (
                    <Badge className="bg-green-500">
                      <TrendingUp className="w-3 h-3" />
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500">
                      <TrendingDown className="w-3 h-3" />
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Low Stock Alert */}
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-red-500" />
            Low Stock Alerts
          </h3>
          <div className="space-y-4">
            {lowStockProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-l-4 border-red-500 bg-red-50 rounded">
                <div>
                  <p className="mb-1">{product.name}</p>
                  <p className="text-sm text-gray-600">Only {product.stock} units left</p>
                </div>
                <Badge className={product.status === 'critical' ? 'bg-red-500' : 'bg-orange-500'}>
                  {product.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
