import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit2,
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { orders } from "../mockData";
import { motion } from "motion/react";
import { useState } from "react";

export default function UserDashboard({ wishlist, setWishlist }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout logic (you can adjust according to your auth system)
    localStorage.removeItem("userToken"); // if you store token
    localStorage.removeItem("userData");  // optional
    navigate("/login"); // redirect to login page
  };

  const menuItems = [
    { icon: User, label: "My Profile", path: "/user/dashboard" },
    { icon: Package, label: "My Orders", path: "/user/dashboard/orders" },
    { icon: Heart, label: "Wishlist", path: "/user/dashboard/wishlist" },
    { icon: MapPin, label: "Address Book", path: "/user/dashboard/addresses" },
    { icon: Settings, label: "Settings", path: "/user/dashboard/settings" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6">My Account</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="w-20 h-20 mb-3">
                <AvatarFallback className="bg-[#FF6600] text-white text-2xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <h3 className="text-center">John Doe</h3>
              <p className="text-sm text-gray-600">john@example.com</p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-[#FF6600] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* ✅ Logout Button Fixed */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 w-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Routes>
            <Route index element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route
              path="wishlist"
              element={<WishlistPage wishlist={wishlist} setWishlist={setWishlist} />}
            />
            <Route path="addresses" element={<AddressesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// ======================= Profile Page =======================
function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+92 300 1234567",
    gender: "male",
    birthday: "1990-01-01",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Card className="p-6">
      <h3 className="mb-6">Personal Information</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["firstName", "lastName", "email", "phone", "birthday", "gender"].map(
            (field) => (
              <div key={field}>
                <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input
                  id={field}
                  name={field}
                  type={field === "birthday" ? "date" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            )
          )}
        </div>
        <Button className="bg-[#FF6600] hover:bg-[#FF6600]/90">
          Save Changes
        </Button>
      </form>
    </Card>
  );
}

// ======================= Orders Page =======================
function OrdersPage() {
  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { className: "bg-green-500 text-white" },
      shipped: { className: "bg-blue-500 text-white" },
      processing: { className: "bg-yellow-500 text-white" },
    };
    return statusConfig[status] || statusConfig.processing;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3>My Orders</h3>
        <p className="text-gray-600">{orders.length} orders</p>
      </div>

      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="mb-1">Order #{order.id}</p>
                <p className="text-sm text-gray-600">{order.date}</p>
              </div>
              <Badge className={getStatusBadge(order.status).className}>
                {order.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              {order.products.map((product, idx) => (
                <p key={idx} className="text-sm text-gray-700">
                  • {product}
                </p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-[#FF6600]">Rs. {order.total.toLocaleString()}</p>
              </div>
              <Link to={`/user/orders/${order.id}`}>
                <Button variant="outline">Track Order</Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// ======================= Wishlist Page =======================
function WishlistPage({ wishlist, setWishlist }) {
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  if (wishlist.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Heart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
        <h3 className="mb-2">Your wishlist is empty</h3>
        <p className="text-gray-600 mb-6">Save items you like to your wishlist</p>
        <Button asChild className="bg-[#FF6600] hover:bg-[#FF6600]/90">
          <Link to="/user/products">Start Shopping</Link>
        </Button>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3>My Wishlist</h3>
        <p className="text-gray-600">{wishlist.length} items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="overflow-hidden group">
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <Link to={`/user/product/${product.id}`}>
                  <h3 className="text-sm mb-2 line-clamp-2 hover:text-[#FF6600] transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-[#FF6600] mb-3">
                  Rs. {product.price.toLocaleString()}
                </p>
                <Button
                  asChild
                  className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
                  size="sm"
                >
                  <Link to={`/user/product/${product.id}`}>View Details</Link>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ======================= Addresses Page =======================
function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      name: "John Doe",
      phone: "+92 300 1234567",
      address: "123 Main Street, Block A",
      city: "Karachi",
      postalCode: "75500",
      isDefault: true,
    },
    {
      id: 2,
      label: "Office",
      name: "John Doe",
      phone: "+92 300 1234567",
      address: "456 Business Avenue",
      city: "Lahore",
      postalCode: "54000",
      isDefault: false,
    },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3>Address Book</h3>
        <Button className="bg-[#FF6600] hover:bg-[#FF6600]/90">
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-2">{address.label}</Badge>
                {address.isDefault && (
                  <Badge variant="outline" className="ml-2">
                    Default
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <p>{address.name}</p>
              <p className="text-gray-600">{address.phone}</p>
              <p className="text-gray-600">{address.address}</p>
              <p className="text-gray-600">
                {address.city}, {address.postalCode}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ======================= Settings Page =======================
function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4">Change Password</h3>
        <form className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Enter current password"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              className="mt-1"
            />
          </div>
          <Button className="bg-[#FF6600] hover:bg-[#FF6600]/90">
            Update Password
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            {
              label: "Email Notifications",
              desc: "Receive order updates via email",
              defaultChecked: true,
            },
            {
              label: "SMS Notifications",
              desc: "Receive order updates via SMS",
              defaultChecked: true,
            },
            {
              label: "Promotional Emails",
              desc: "Receive special offers and deals",
              defaultChecked: false,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between"
            >
              <div>
                <p>{item.label}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <input
                type="checkbox"
                className="toggle"
                defaultChecked={item.defaultChecked}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
