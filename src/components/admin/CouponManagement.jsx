import { useState } from 'react';
import { Plus, Edit, Trash2, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { coupons as initialCoupons } from '../mockData';
import { toast } from 'sonner';

export default function CouponManagement() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    type: 'percentage',
    expiryDate: '',
    minPurchase: '',
    usageLimit: ''
  });

  // ✅ TypeScript type (e: React.FormEvent) removed
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingCoupon) {
      setCoupons(coupons.map(coupon =>
        coupon.id === editingCoupon.id
          ? {
              ...coupon,
              ...formData,
              discount: Number(formData.discount),
              minPurchase: Number(formData.minPurchase),
              usageLimit: Number(formData.usageLimit)
            }
          : coupon
      ));
      toast.success('Coupon updated successfully!');
    } else {
      setCoupons([
        ...coupons,
        {
          id: Date.now(),
          ...formData,
          discount: Number(formData.discount),
          minPurchase: Number(formData.minPurchase),
          usageLimit: Number(formData.usageLimit),
          used: 0,
          status: 'active'
        }
      ]);
      toast.success('Coupon created successfully!');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      discount: '',
      type: 'percentage',
      expiryDate: '',
      minPurchase: '',
      usageLimit: ''
    });
    setEditingCoupon(null);
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discount: coupon.discount.toString(),
      type: coupon.type,
      expiryDate: coupon.expiryDate,
      minPurchase: coupon.minPurchase.toString(),
      usageLimit: coupon.usageLimit.toString()
    });
    setIsDialogOpen(true);
  };

  // ✅ TypeScript number type removed and window.confirm added
  const handleDelete = (couponId) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(coupon => coupon.id !== couponId));
      toast.success('Coupon deleted successfully!');
    }
  };

  // ✅ TypeScript string type removed
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success('Coupon code copied!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Coupon Management</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FF6600] hover:bg-[#FF6600]/90">
              <Plus className="w-4 h-4 mr-2" />
              Create Coupon
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="code">Coupon Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g., SAVE50"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Discount Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (Rs.)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="discount">Discount Value *</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData({ ...formData, discount: e.target.value })
                    }
                    placeholder={formData.type === 'percentage' ? '50' : '500'}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minPurchase">Min Purchase (Rs.) *</Label>
                  <Input
                    id="minPurchase"
                    type="number"
                    value={formData.minPurchase}
                    onChange={(e) =>
                      setFormData({ ...formData, minPurchase: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="usageLimit">Usage Limit *</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) =>
                      setFormData({ ...formData, usageLimit: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-[#FF6600] hover:bg-[#FF6600]/90">
                  {editingCoupon ? 'Update' : 'Create'} Coupon
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-gray-600 mb-2">Total Coupons</p>
          <p className="text-3xl">{coupons.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-gray-600 mb-2">Active Coupons</p>
          <p className="text-3xl text-green-500">
            {coupons.filter((c) => c.status === 'active').length}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-gray-600 mb-2">Total Usage</p>
          <p className="text-3xl text-[#FF6600]">
            {coupons.reduce((sum, c) => sum + c.used, 0)}
          </p>
        </Card>
      </div>

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <Card key={coupon.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <code className="bg-[#FF6600] text-white px-3 py-1 rounded text-lg">
                    {coupon.code}
                  </code>
                  <Button variant="ghost" size="sm" onClick={() => copyCode(coupon.code)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <Badge className={coupon.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                  {coupon.status}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(coupon)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(coupon.id)}
                  className="text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span>
                  {coupon.type === 'percentage'
                    ? `${coupon.discount}%`
                    : `Rs. ${coupon.discount}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Min Purchase:</span>
                <span>Rs. {coupon.minPurchase.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Expiry Date:</span>
                <span>{coupon.expiryDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Usage:</span>
                <span>
                  {coupon.used} / {coupon.usageLimit}{' '}
                  <span className="text-gray-500">
                    ({Math.round((coupon.used / coupon.usageLimit) * 100)}%)
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#FF6600] h-2 rounded-full transition-all"
                  style={{ width: `${(coupon.used / coupon.usageLimit) * 100}%` }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
