import { useState } from 'react';
import { Search, Eye, Ban, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { customers } from '../mockData';
import { toast } from 'sonner';

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customersList, setCustomersList] = useState(customers);

  const filteredCustomers = customersList.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleBlock = (customerId) => {
    setCustomersList(customersList.map(customer =>
      customer.id === customerId
        ? { ...customer, status: customer.status === 'active' ? 'blocked' : 'active' }
        : customer
    ));
    const customer = customersList.find(c => c.id === customerId);
    toast.success(`Customer ${customer?.status === 'active' ? 'blocked' : 'unblocked'} successfully!`);
  };

  const handleDelete = (customerId) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomersList(customersList.filter(customer => customer.id !== customerId));
      toast.success('Customer deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Customer Management</h2>
        <Badge className="text-lg px-4 py-2">{customersList.length} Total Customers</Badge>
      </div>

      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search customers by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Contact</th>
                <th className="text-left py-3 px-4">Orders</th>
                <th className="text-left py-3 px-4">Total Spent</th>
                <th className="text-left py-3 px-4">Join Date</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FF6600] text-white rounded-full flex items-center justify-center">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p>{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm">{customer.phone}</p>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{customer.orders} orders</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-[#FF6600]">Rs. {customer.totalSpent.toLocaleString()}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm">{customer.joinDate}</p>
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={customer.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" title="View Profile">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBlock(customer.id)}
                        className={customer.status === 'active' ? 'text-orange-500' : 'text-green-500'}
                        title={customer.status === 'active' ? 'Block' : 'Unblock'}
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
