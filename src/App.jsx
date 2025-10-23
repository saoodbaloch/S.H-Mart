import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import EntryScreen from './components/EntryScreen';
import UserLayout from './components/user/UserLayout';
import HomePage from './components/user/HomePage';
import ProductListing from './components/user/ProductListing';
import ProductDetail from './components/user/ProductDetail';
import Cart from './components/user/Cart';
import Checkout from './components/user/Checkout';
import OrderTracking from './components/user/OrderTracking';
import UserDashboard from './components/user/UserDashboard';
import Login from './components/user/Login';
import Register from './components/user/Register';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import ProductManagement from './components/admin/ProductManagement';
import CategoryManagement from './components/admin/CategoryManagement';
import OrderManagement from './components/admin/OrderManagement';
import CustomerManagement from './components/admin/CustomerManagement';
import PaymentOverview from './components/admin/PaymentOverview';
import SalesAnalytics from './components/admin/SalesAnalytics';
import StockManagement from './components/admin/StockManagement';
import CouponManagement from './components/admin/CouponManagement';
import AdminSettings from './components/admin/AdminSettings';

function App() {
  const [userRole, setUserRole] = useState(null); // 'user' | 'admin' | null
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route 
          path="/" 
          element={
            <EntryScreen 
              setUserRole={setUserRole} 
              setIsAdminAuthenticated={setIsAdminAuthenticated}
            />
          } 
        />
        
        {/* User Routes */}
        <Route path="/user/*" element={<UserLayout cartItems={cartItems} />}>
          <Route index element={<HomePage wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="products" element={<ProductListing wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="orders/:orderId" element={<OrderTracking />} />
          <Route path="dashboard/*" element={<UserDashboard wishlist={wishlist} setWishlist={setWishlist} />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="payments" element={<PaymentOverview />} />
          <Route path="analytics" element={<SalesAnalytics />} />
          <Route path="stock" element={<StockManagement />} />
          <Route path="coupons" element={<CouponManagement />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Catch-all route - redirects to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
