'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ProductCard from '../shop/ProductCard'

// Mock data for featured products
const featuredProducts = [
  {
    id: '1',
    name: 'Obsidian Chronograph Watch',
    price: 1299.99,
    image: '/images/products/watch-1.jpg',
    category: 'Watches',
    rating: 4.9,
    reviewCount: 128,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Noir Leather Weekender Bag',
    price: 899.99,
    image: '/images/products/bag-1.jpg',
    category: 'Accessories',
    rating: 4.8,
    reviewCount: 94,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Eclipse Wireless Headphones',
    price: 349.99,
    image: '/images/products/headphones-1.jpg',
    category: 'Electronics',
    rating: 4.7,
    reviewCount: 216,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Onyx Minimalist Wallet',
    price: 129.99,
    image: '/images/products/wallet-1.jpg',
    category: 'Accessories',
    rating: 4.6,
    reviewCount: 173,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Phantom Automatic Umbrella',
    price: 89.99,
    image: '/images/products/umbrella-1.jpg',
    category: 'Accessories',
    rating: 4.5,
    reviewCount: 68,
    isNew: true,
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Midnight Ceramic Mug Set',
    price: 79.99,
    image: '/images/products/mug-1.jpg',
    category: 'Home',
    rating: 4.7,
    reviewCount: 42,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '7',
    name: 'Shadow Premium Sunglasses',
    price: 249.99,
    image: '/images/products/sunglasses-1.jpg',
    category: 'Accessories',
    rating: 4.8,
    reviewCount: 87,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '8',
    name: 'Stealth Wireless Charger',
    price: 69.99,
    image: '/images/products/charger-1.jpg',
    category: 'Electronics',
    rating: 4.6,
    reviewCount: 124,
    isNew: true,
    isFeatured: true,
  },
]

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all')
  const [filteredProducts, setFilteredProducts] = useState(featuredProducts)

  const categories = ['all', ...new Set(featuredProducts.map((product) => product.category.toLowerCase()))]

  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredProducts(featuredProducts)
    } else {
      setFilteredProducts(
        featuredProducts.filter((product) => product.category.toLowerCase() === activeTab)
      )
    }
  }, [activeTab])

  return (
    <section className="section bg-primary-900/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Featured Products</h2>
          <p className="text-primary-300 max-w-3xl mx-auto">
            Discover our handpicked selection of premium products that exemplify luxury and quality.
          </p>
        </div>

        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === category ? 'bg-luxe-gold text-black' : 'bg-primary-800 text-primary-300 hover:bg-primary-700 hover:text-white'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="btn-outline">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}