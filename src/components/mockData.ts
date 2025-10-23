export const categories = [
  { id: 1, name: 'Electronics', icon: '📱' },
  { id: 2, name: 'Fashion', icon: '👔' },
  { id: 3, name: 'Home & Living', icon: '🏠' },
  { id: 4, name: 'Beauty', icon: '💄' },
  { id: 5, name: 'Sports', icon: '⚽' },
  { id: 6, name: 'Books', icon: '📚' },
  { id: 7, name: 'Toys', icon: '🎮' },
  { id: 8, name: 'Groceries', icon: '🛒' },
];

export const products = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    rating: 4.5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 45,
    brand: 'SoundPro',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Color': 'Black'
    },
    flashSale: true
  },
  {
    id: 2,
    name: 'Smart Watch Series 6',
    category: 'Electronics',
    price: 12999,
    originalPrice: 15999,
    discount: 19,
    rating: 4.8,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 23,
    brand: 'TechTime',
    description: 'Advanced smartwatch with health tracking, GPS, and water resistance.',
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery': '7 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart Rate, SpO2, GPS'
    },
    flashSale: true
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    category: 'Fashion',
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    rating: 4.3,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 67,
    brand: 'TravelPro',
    description: 'Durable laptop backpack with multiple compartments and USB charging port.',
    specifications: {
      'Capacity': '25L',
      'Laptop Size': 'Up to 15.6"',
      'Material': 'Water-resistant Polyester',
      'Warranty': '1 Year'
    },
    flashSale: false
  },
  {
    id: 4,
    name: 'LED Ring Light',
    category: 'Electronics',
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.6,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1551191916-08a5a6c9b88d?w=500',
    stock: 34,
    brand: 'LightPro',
    description: '18-inch LED ring light perfect for photography and video recording.',
    specifications: {
      'Size': '18 inches',
      'Power': '65W',
      'Color Temperature': '3200K-5600K',
      'Dimming': '1-100%'
    },
    flashSale: true
  },
  {
    id: 5,
    name: 'Running Shoes',
    category: 'Sports',
    price: 5999,
    originalPrice: 8999,
    discount: 33,
    rating: 4.7,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 89,
    brand: 'SportMax',
    description: 'Comfortable running shoes with advanced cushioning technology.',
    specifications: {
      'Material': 'Mesh & Synthetic',
      'Sole': 'Rubber',
      'Weight': '280g',
      'Sizes': '38-45'
    },
    flashSale: false
  },
  {
    id: 6,
    name: 'Minimalist Wallet',
    category: 'Fashion',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.4,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
    stock: 156,
    brand: 'LeatherCraft',
    description: 'Slim leather wallet with RFID protection and card holder.',
    specifications: {
      'Material': 'Genuine Leather',
      'Capacity': '8-10 cards',
      'RFID Protection': 'Yes',
      'Dimensions': '10x7x1 cm'
    },
    flashSale: false
  },
  {
    id: 7,
    name: 'Portable Power Bank 20000mAh',
    category: 'Electronics',
    price: 2999,
    originalPrice: 4499,
    discount: 33,
    rating: 4.5,
    reviews: 523,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    stock: 112,
    brand: 'PowerMax',
    description: 'High-capacity power bank with fast charging and dual USB ports.',
    specifications: {
      'Capacity': '20000mAh',
      'Output': '2x USB-A, 1x USB-C',
      'Fast Charging': 'Yes',
      'Weight': '350g'
    },
    flashSale: true
  },
  {
    id: 8,
    name: 'Yoga Mat Premium',
    category: 'Sports',
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    rating: 4.6,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 78,
    brand: 'FitLife',
    description: 'Non-slip yoga mat with extra cushioning for comfortable workouts.',
    specifications: {
      'Thickness': '6mm',
      'Material': 'TPE',
      'Size': '183x61 cm',
      'Non-slip': 'Yes'
    },
    flashSale: false
  },
  {
    id: 9,
    name: 'Coffee Maker Machine',
    category: 'Home & Living',
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    rating: 4.7,
    reviews: 389,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    stock: 34,
    brand: 'BrewMaster',
    description: 'Automatic coffee maker with programmable settings and thermal carafe.',
    specifications: {
      'Capacity': '12 cups',
      'Power': '900W',
      'Features': 'Programmable, Auto-off',
      'Warranty': '2 Years'
    },
    flashSale: true
  },
  {
    id: 10,
    name: 'Desk Organizer Set',
    category: 'Home & Living',
    price: 1499,
    originalPrice: 2299,
    discount: 35,
    rating: 4.3,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=500',
    stock: 203,
    brand: 'DeskPro',
    description: 'Modern desk organizer set with multiple compartments for office supplies.',
    specifications: {
      'Material': 'Plastic & Metal',
      'Pieces': '5 pieces',
      'Color': 'Black',
      'Dimensions': 'Various'
    },
    flashSale: false
  },
  {
    id: 11,
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 899,
    originalPrice: 1499,
    discount: 40,
    rating: 4.4,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    stock: 289,
    brand: 'TechGear',
    description: 'Ergonomic wireless mouse with adjustable DPI and long battery life.',
    specifications: {
      'Connectivity': '2.4GHz Wireless',
      'DPI': '800-3200',
      'Battery': '18 months',
      'Buttons': '6'
    },
    flashSale: false
  },
  {
    id: 12,
    name: 'Sunglasses UV Protection',
    category: 'Fashion',
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    stock: 145,
    brand: 'StyleVision',
    description: 'Polarized sunglasses with UV400 protection and premium frames.',
    specifications: {
      'UV Protection': 'UV400',
      'Polarized': 'Yes',
      'Frame Material': 'Metal Alloy',
      'Lens Material': 'TAC'
    },
    flashSale: true
  }
];

export const banners = [
  {
    id: 1,
    title: 'Mega Sale',
    subtitle: 'Up to 50% OFF on Electronics',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    color: '#FF6600'
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Latest Fashion Collection 2024',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200',
    color: '#000000'
  },
  {
    id: 3,
    title: 'Home Essentials',
    subtitle: 'Transform Your Living Space',
    image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200',
    color: '#4A90E2'
  }
];

export const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-10-15',
    items: 2,
    total: 7998,
    status: 'delivered',
    products: ['Wireless Bluetooth Headphones', 'Portable Power Bank'],
    deliveryDate: '2024-10-16'
  },
  {
    id: 'ORD-2024-002',
    date: '2024-10-14',
    items: 1,
    total: 12999,
    status: 'shipped',
    products: ['Smart Watch Series 6'],
    deliveryDate: '2024-10-17'
  },
  {
    id: 'ORD-2024-003',
    date: '2024-10-13',
    items: 3,
    total: 8397,
    status: 'processing',
    products: ['Laptop Backpack', 'Yoga Mat', 'Desk Organizer'],
    deliveryDate: '2024-10-18'
  }
];

export const customers = [
  {
    id: 1,
    name: 'Ahmad Hassan',
    email: 'ahmad@example.com',
    phone: '+92 300 1234567',
    orders: 15,
    totalSpent: 145000,
    joinDate: '2023-05-12',
    status: 'active'
  },
  {
    id: 2,
    name: 'Fatima Khan',
    email: 'fatima@example.com',
    phone: '+92 301 7654321',
    orders: 8,
    totalSpent: 67000,
    joinDate: '2023-08-20',
    status: 'active'
  },
  {
    id: 3,
    name: 'Ali Raza',
    email: 'ali@example.com',
    phone: '+92 333 9876543',
    orders: 23,
    totalSpent: 234000,
    joinDate: '2023-03-05',
    status: 'active'
  },
  {
    id: 4,
    name: 'Sara Ahmed',
    email: 'sara@example.com',
    phone: '+92 345 2468135',
    orders: 5,
    totalSpent: 42000,
    joinDate: '2024-01-15',
    status: 'active'
  }
];

export const adminOrders = [
  {
    id: 'ORD-2024-101',
    customer: 'Ahmad Hassan',
    items: 2,
    total: 17998,
    status: 'pending',
    date: '2024-10-16',
    payment: 'COD'
  },
  {
    id: 'ORD-2024-102',
    customer: 'Fatima Khan',
    items: 1,
    total: 4999,
    status: 'shipped',
    date: '2024-10-15',
    payment: 'Card'
  },
  {
    id: 'ORD-2024-103',
    customer: 'Ali Raza',
    items: 3,
    total: 23997,
    status: 'delivered',
    date: '2024-10-14',
    payment: 'JazzCash'
  },
  {
    id: 'ORD-2024-104',
    customer: 'Sara Ahmed',
    items: 1,
    total: 12999,
    status: 'pending',
    date: '2024-10-16',
    payment: 'EasyPaisa'
  }
];

export const coupons = [
  {
    id: 1,
    code: 'WELCOME50',
    discount: 50,
    type: 'percentage',
    expiryDate: '2024-12-31',
    minPurchase: 1000,
    usageLimit: 100,
    used: 45,
    status: 'active'
  },
  {
    id: 2,
    code: 'FLASH20',
    discount: 20,
    type: 'percentage',
    expiryDate: '2024-10-31',
    minPurchase: 2000,
    usageLimit: 500,
    used: 234,
    status: 'active'
  },
  {
    id: 3,
    code: 'SAVE500',
    discount: 500,
    type: 'fixed',
    expiryDate: '2024-11-30',
    minPurchase: 5000,
    usageLimit: 200,
    used: 89,
    status: 'active'
  }
];
