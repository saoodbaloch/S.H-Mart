import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { products, categories } from '../mockData';

export default function ProductListing({ wishlist, setWishlist }) {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  const brands = [...new Set(products.map(p => p.brand))];

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryName));
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  let filteredProducts = [...products];

  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category));
  }

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand));
  }

  filteredProducts = filteredProducts.filter(
    p => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'popular') {
    filteredProducts.sort((a, b) => b.reviews - a.reviews);
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="mb-4">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={20000}
          step={100}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>Rs. {priceRange[0].toLocaleString()}</span>
          <span>Rs. {priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => toggleCategory(category.name)}
              />
              <label htmlFor={`cat-${category.id}`} className="text-sm cursor-pointer">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-4">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setSelectedBrands([]);
          setPriceRange([0, 20000]);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2>
            {categoryFilter ? categoryFilter : searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
          </h2>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <Card className="p-6 sticky top-24">
            <FilterSidebar />
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                        className={`w-5 h-5 ${wishlist.find(item => item.id === product.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                          }`}
                      />
                    </button>
                    {product.stock < 20 && (
                      <Badge className="absolute bottom-3 left-3 bg-red-500 text-white">
                        Only {product.stock} left!
                      </Badge>
                    )}
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-xl">No products found matching your filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                  setPriceRange([0, 20000]);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
