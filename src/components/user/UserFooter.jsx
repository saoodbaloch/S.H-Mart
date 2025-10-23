import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function UserFooter() {
  return (
    <footer className="bg-[#222222] text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="mb-4">About S.H-Mart</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted online shopping platform with millions of products, competitive prices, and fast delivery across the country.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#FF6600] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#FF6600] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#FF6600] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#FF6600] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/user" className="text-gray-400 hover:text-[#FF6600] transition-colors">Home</Link></li>
              <li><Link to="/user/products" className="text-gray-400 hover:text-[#FF6600] transition-colors">Shop</Link></li>
              <li><Link to="/user/cart" className="text-gray-400 hover:text-[#FF6600] transition-colors">Cart</Link></li>
              <li><Link to="/user/dashboard" className="text-gray-400 hover:text-[#FF6600] transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-[#FF6600] transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FF6600] transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FF6600] transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FF6600] transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#FF6600] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>support@darazmart.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Main Street, Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 DarazMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
