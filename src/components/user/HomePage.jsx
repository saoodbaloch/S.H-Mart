import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Star, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { categories, products, banners } from '../mockData';

export default function HomePage({ wishlist, setWishlist }) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const flashSaleProducts = products.filter(p => p.flashSale);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Banner Slider */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-r from-[#FF6600] to-[#FF8533]">
        {banners.map((banner, index) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentBanner ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            style={{ pointerEvents: index === currentBanner ? 'auto' : 'none' }}
          >
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: index === currentBanner ? 1 : 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  {banner.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: index === currentBanner ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl mb-6"
                >
                  {banner.subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: index === currentBanner ? 1 : 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    asChild
                    className="bg-white text-[#FF6600] hover:bg-white/90 px-8 py-6"
                  >
                    <Link to="/user/products">Shop Now</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Banner Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentBanner ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={() => setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentBanner(prev => (prev + 1) % banners.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6">Shop by Category</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/user/products?category=${category.name}`}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all text-center"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <p className="text-sm text-gray-700">{category.name}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#FF6600]">⚡ Flash Sale</h2>
            <p className="text-gray-600">Limited time offers - Grab them fast!</p>
          </div>
          <Link to="/user/products">
            <Button variant="outline" className="border-[#FF6600] text-[#FF6600] hover:bg-[#FF6600] hover:text-white">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSaleProducts.slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow group">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-[#FF6600] text-white">
                    -{product.discount}%
                  </Badge>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.find(item => item.id === product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/user/product/${product.id}`}>
                    <h3 className="text-sm mb-2 line-clamp-2 hover:text-[#FF6600] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#FF6600]">Rs. {product.price.toLocaleString()}</span>
                    <span className="text-gray-400 line-through text-sm">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
                  >
                    <Link to={`/user/product/${product.id}`}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow group">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-[#FF6600] text-white">
                      -{product.discount}%
                    </Badge>
                  )}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.find(item => item.id === product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/user/product/${product.id}`}>
                    <h3 className="text-sm mb-2 line-clamp-2 hover:text-[#FF6600] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#FF6600]">Rs. {product.price.toLocaleString()}</span>
                    {product.discount > 0 && (
                      <span className="text-gray-400 line-through text-sm">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button
                    asChild
                    className="w-full bg-[#FF6600] hover:bg-[#FF6600]/90"
                  >
                    <Link to={`/user/product/${product.id}`}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders over Rs. 1000' },
              { icon: '💳', title: 'Secure Payment', desc: '100% secure transactions' },
              { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
              { icon: '⭐', title: 'Best Quality', desc: 'Guaranteed satisfaction' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
