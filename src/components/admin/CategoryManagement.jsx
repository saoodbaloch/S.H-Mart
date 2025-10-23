import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { categories as initialCategories } from '../mockData';
import { toast } from 'sonner';

export default function CategoryManagement() {
  const [categories, setCategories] = useState(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: ''
  });

  // ✅ FIXED: TypeScript syntax removed
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id ? { ...cat, ...formData } : cat
      ));
      toast.success('Category updated successfully!');
    } else {
      setCategories([...categories, { id: Date.now(), ...formData }]);
      toast.success('Category added successfully!');
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', icon: '' });
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, icon: category.icon });
    setIsDialogOpen(true);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
      toast.success('Category deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2>Category Management</h2>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FF6600] hover:bg-[#FF6600]/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="icon">Icon (Emoji) *</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="e.g., 📱"
                  required
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-[#FF6600] hover:bg-[#FF6600]/90">
                  {editingCategory ? 'Update' : 'Add'} Category
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">{category.icon}</div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(category)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                  className="text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <h3 className="text-lg">{category.name}</h3>
            <p className="text-sm text-gray-600 mt-2">
              {Math.floor(Math.random() * 50) + 10} products
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
