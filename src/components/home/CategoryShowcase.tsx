'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const categories = [
  {
    id: 'watches',
    name: 'Watches',
    description: 'Timeless elegance for your wrist',
    image: '/images/categories/watches.jpg',
    link: '/shop/watches',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Complete your look with premium details',
    image: '/images/categories/accessories.jpg',
    link: '/shop/accessories',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Cutting-edge technology with style',
    image: '/images/categories/electronics.jpg',
    link: '/shop/electronics',
  },
  {
    id: 'home',
    name: 'Home',
    description: 'Elevate your living space',
    image: '/images/categories/home.jpg',
    link: '/shop/home',
  },
]

export default function CategoryShowcase() {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Shop by Category</h2>
          <p className="text-primary-300 max-w-3xl mx-auto">
            Browse our curated collections of premium products across various categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={category.link}
                className="group block relative overflow-hidden rounded-lg aspect-[16/9] md:aspect-[16/10]"
              >
                {/* Placeholder for category image - in production, use actual images */}
                <div 
                  className="absolute inset-0 bg-primary-800 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-luxe-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-luxe-gold transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-primary-200 mb-4 max-w-md">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-luxe-gold font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Explore Collection
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}