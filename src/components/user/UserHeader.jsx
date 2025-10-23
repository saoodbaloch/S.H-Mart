import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "motion/react";

export default function UserHeader({ cartCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/user/products?search=${searchQuery}`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#FF6600] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="hidden md:block">
            Welcome to S.H-Mart - Your One Stop Shop!
          </div>
          <div className="flex gap-4 ml-auto">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <span>|</span>
            <Link to="/register" className="hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/user" className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-[#FF6600] text-white px-4 py-2 rounded-lg">
              <span className="text-2xl">S.H-Mart</span>
            </div>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 py-6 rounded-r-none border-r-0"
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 bottom-0 bg-[#FF6600] hover:bg-[#FF6600]/90 rounded-l-none px-6"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/user/dashboard/wishlist">
              <Button
                variant="ghost"
                className="relative hidden md:flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                <span className="hidden lg:inline">Wishlist</span>
              </Button>
            </Link>

            <Link to="/user/cart">
              <Button
                variant="ghost"
                className="relative flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden lg:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6600] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/user/dashboard">
              <Button
                variant="ghost"
                className="hidden md:flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                <span className="hidden lg:inline">Account</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1 top-1 bottom-1 bg-[#FF6600] hover:bg-[#FF6600]/90"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link
                to="/user/dashboard"
                className="block py-2 hover:bg-gray-50 px-4 rounded"
              >
                My Account
              </Link>
              <Link
                to="/user/dashboard/wishlist"
                className="block py-2 hover:bg-gray-50 px-4 rounded"
              >
                Wishlist
              </Link>
              <Link
                to="/user/dashboard/orders"
                className="block py-2 hover:bg-gray-50 px-4 rounded"
              >
                My Orders
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
