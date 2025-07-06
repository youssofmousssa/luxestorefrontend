'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'

type ProductProps = {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviewCount: number
  isNew?: boolean
  isFeatured?: boolean
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    
    toast.success(`${product.name} added to cart`)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toast.success(`${product.name} added to wishlist`)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div 
        className="card group h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square bg-primary-800">
          {/* Placeholder for product image - in production, use actual images */}
          <div 
            className="w-full h-full bg-primary-800 transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          
          {/* Product badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="badge-primary">New</span>
            )}
            {product.isFeatured && (
              <span className="badge-secondary">Featured</span>
            )}
          </div>
          
          {/* Quick action buttons */}
          <div className={`absolute right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <button 
              onClick={handleAddToWishlist}
              className="w-9 h-9 rounded-full bg-primary-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-luxe-gold hover:text-black transition-colors duration-200"
              aria-label="Add to wishlist"
            >
              <FiHeart className="w-4 h-4" />
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-9 h-9 rounded-full bg-primary-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-luxe-gold hover:text-black transition-colors duration-200"
              aria-label="Add to cart"
            >
              <FiShoppingBag className="w-4 h-4" />
            </button>
            <Link 
              href={`/product/${product.id}`}
              className="w-9 h-9 rounded-full bg-primary-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-luxe-gold hover:text-black transition-colors duration-200"
              aria-label="Quick view"
            >
              <FiEye className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="text-sm text-primary-400 mb-1">{product.category}</div>
          <h3 className="text-lg font-medium text-white mb-2 line-clamp-2">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-luxe-gold' : 'text-primary-600'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-primary-400 ml-2">
              ({product.reviewCount} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="mt-auto">
            <div className="text-xl font-semibold text-luxe-gold">
              ${product.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}