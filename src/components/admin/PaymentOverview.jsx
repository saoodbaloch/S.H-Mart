import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { DollarSign, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function PaymentOverview() {
  const paymentStats = [
    {
      method: 'Cash on Delivery',
      icon: Banknote,
      amount: 1245678,
      percentage: 45,
      color: 'bg-green-500'
    },
    {
      method: 'Card Payment',
      icon: CreditCard,
      amount: 876543,
      percentage: 32,
      color: 'bg-blue-500'
    },
    {
      method: 'EasyPaisa',
      icon: Smartphone,
      amount: 432109,
      percentage: 16,
      color: 'bg-purple-500'
    },
    {
      method: 'JazzCash',
      icon: Smartphone,
      amount: 234567,
      percentage: 7,
      color: 'bg-orange-500'
    }
  ];

  const paymentMethodData = [
    { name: 'COD', value: 45 },
    { name: 'Card', value: 32 },
    { name: 'EasyPaisa', value: 16 },
    { name: 'JazzCash', value: 7 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 245000 },
    { month: 'Feb', revenue: 298000 },
    { month: 'Mar', revenue: 276000 },
    { month: 'Apr', revenue: 334000 },
    { month: 'May', revenue: 312000 },
    { month: 'Jun', revenue: 389000 },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F97316'];

  const recentTransactions = [
    { id: 'TXN-001', customer: 'Ahmad Hassan', method: 'Card', amount: 17998, status: 'completed', date: '2024-10-16' },
    { id: 'TXN-002', customer: 'Fatima Khan', method: 'COD', amount: 4999, status: 'pending', date: '2024-10-16' },
    { id: 'TXN-003', customer: 'Ali Raza', method: 'JazzCash', amount: 23997, status: 'completed', date: '2024-10-15' },
    { id: 'TXN-004', customer: 'Sara Ahmed', method: 'EasyPaisa', amount: 12999, status: 'completed', date: '2024-10-15' },
  ];

  return (
    <div className="space-y-6">
      <h2>Payment Overview</h2>

      {/* Total Revenue */}
      <Card className="p-6 bg-gradient-to-r from-[#FF6600] to-[#FF8533] text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 mb-2">Total Revenue</p>
            <h1 className="text-white">Rs. 2,788,897</h1>
            <p className="text-white/80 mt-2">↑ 15.3% from last month</p>
          </div>
          <div className="bg-white/20 p-4 rounded-full">
            <DollarSign className="w-12 h-12" />
          </div>
        </div>
      </Card>

      {/* Payment Methods Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paymentStats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <Badge>{stat.percentage}%</Badge>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.method}</p>
            <p className="text-2xl">Rs. {stat.amount.toLocaleString()}</p>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Distribution */}
        <Card className="p-6">
          <h3 className="mb-4">Payment Method Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Trend */}
        <Card className="p-6">
          <h3 className="mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#FF6600" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Transaction ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Payment Method</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{transaction.id}</td>
                  <td className="py-3 px-4">{transaction.customer}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{transaction.method}</Badge>
                  </td>
                  <td className="py-3 px-4 text-[#FF6600]">
                    Rs. {transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={transaction.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
                      {transaction.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
