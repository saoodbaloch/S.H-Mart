import { useState } from 'react';
import { Search, AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { products } from '../mockData';
import { toast } from 'sonner';

export default function StockManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [productsList, setProductsList] = useState(products);

  const filteredProducts = productsList.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = productsList.filter(p => p.stock < 20);
  const outOfStockProducts = productsList.filter(p => p.stock === 0);
  const totalStock = productsList.reduce((sum, p) => sum + p.stock, 0);

  // Type annotations removed for JSX
  const updateStock = (productId, newStock) => {
    setProductsList(productsList.map(product =>
      product.id === productId ? { ...product, stock: newStock } : product
    ));
    toast.success('Stock updated successfully!');
  };

  const getStockBadge = (stock) => {
    if (stock === 0) return <Badge className="bg-gray-500">Out of Stock</Badge>;
    if (stock < 10) return <Badge className="bg-red-500">Critical</Badge>;
    if (stock < 20) return <Badge className="bg-orange-500">Low Stock</Badge>;
    return <Badge className="bg-green-500">In Stock</Badge>;
  };

  return (
    <div className="space-y-6">
      <h2>Stock Management</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500 p-3 rounded-lg text-white">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Total Products</p>
          <p className="text-2xl">{productsList.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-500 p-3 rounded-lg text-white">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Total Stock</p>
          <p className="text-2xl">{totalStock} units</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-500 p-3 rounded-lg text-white">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Low Stock</p>
          <p className="text-2xl">{lowStockProducts.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-500 p-3 rounded-lg text-white">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-gray-600 text-sm">Out of Stock</p>
          <p className="text-2xl">{outOfStockProducts.length}</p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Products Table */}
      <Card className="p-6">
        <h3 className="mb-4">Inventory</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">SKU</th>
                <th className="text-left py-3 px-4">Current Stock</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="line-clamp-1 max-w-xs">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4 text-gray-600">SKU-{product.id.toString().padStart(4, '0')}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={product.stock}
                        onChange={(e) => updateStock(product.id, parseInt(e.target.value) || 0)}
                        className="w-24"
                      />
                      <span className="text-sm text-gray-600">units</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getStockBadge(product.stock)}
                  </td>
                  <td className="py-3 px-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStock(product.id, product.stock + 10)}
                    >
                      + Add 10
                    </Button>
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
