import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Shield, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function EntryScreen({ setUserRole, setIsAdminAuthenticated }) {
  const navigate = useNavigate();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUserClick = () => {
    setUserRole('user');
    navigate('/user');
  };

  const handleAdminClick = () => {
    setShowAdminLogin(true);
    setError('');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (username === 'admin1' && password === 'admin') {
      setUserRole('admin');
      setIsAdminAuthenticated(true);
      navigate('/admin');
    } else {
      setError('Invalid credentials. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#FF6600] via-[#FF8533] to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 flex justify-center"
        >
          <div className="bg-white p-6 rounded-full shadow-2xl">
            <ShoppingBag className="w-16 h-16 text-[#FF6600]" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white mb-4"
        >
          Welcome to S.H-Mart
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/90 mb-12 text-xl"
        >
          Choose how you'd like to continue
        </motion.p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleUserClick}
              className="group relative overflow-hidden bg-white hover:bg-white text-[#FF6600] px-12 py-8 rounded-2xl shadow-2xl transition-all duration-300 min-w-[280px]"
            >
              <div className="flex flex-col items-center gap-3">
                <ShoppingBag className="w-10 h-10" />
                <span className="text-xl">Continue as User</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6600]/0 via-[#FF6600]/10 to-[#FF6600]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleAdminClick}
              className="group relative overflow-hidden bg-black hover:bg-black text-white px-12 py-8 rounded-2xl shadow-2xl transition-all duration-300 min-w-[280px]"
            >
              <div className="flex flex-col items-center gap-3">
                <Shield className="w-10 h-10" />
                <span className="text-xl">Continue as Admin</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowAdminLogin(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative"
          >
            <button
              onClick={() => setShowAdminLogin(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="bg-[#FF6600] p-4 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-center mb-6">Admin Login</h2>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter Admin Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90 text-white py-6 rounded-xl"
              >
                Login as Admin
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              Demo credentials: admin1 / admin
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
