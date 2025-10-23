import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, 
  CreditCard, TrendingUp, Warehouse, Tag, Settings, Menu, X, LogOut 
} from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: FolderTree, label: 'Categories', path: '/admin/categories' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: TrendingUp, label: 'Analytics', path: '/admin/analytics' },
    { icon: Warehouse, label: 'Stock', path: '/admin/stock' },
    { icon: Tag, label: 'Coupons', path: '/admin/coupons' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Top Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <div className="bg-[#FF6600] text-white px-4 py-2 rounded-lg">
              <span className="text-xl">S.H-Mart Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                Visit Store
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-red-500">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r overflow-y-auto z-30"
            >
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-[#FF6600] text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all ${sidebarOpen ? 'lg:ml-0' : ''}`}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
