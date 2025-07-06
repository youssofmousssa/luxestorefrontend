'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const heroSlides = [
  {
    id: 1,
    title: 'Luxury Redefined',
    subtitle: 'Discover our exclusive collection',
    description: 'Elevate your lifestyle with our premium selection of luxury products.',
    image: '/images/hero-1.jpg',
    cta: 'Shop Now',
    link: '/shop',
  },
  {
    id: 2,
    title: 'Elegance in Every Detail',
    subtitle: 'Crafted with precision',
    description: 'Experience the perfect blend of craftsmanship and innovation.',
    image: '/images/hero-2.jpg',
    cta: 'Explore Collection',
    link: '/shop/collection',
  },
  {
    id: 3,
    title: 'Timeless Sophistication',
    subtitle: 'Beyond ordinary',
    description: 'Indulge in timeless pieces that transcend trends and seasons.',
    image: '/images/hero-3.jpg',
    cta: 'View Bestsellers',
    link: '/shop/bestsellers',
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-screen overflow-hidden bg-luxe-black">
      {/* Placeholder for hero images - in production, replace with actual images */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Placeholder gradient background - replace with actual images */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-luxe-black via-primary-900 to-luxe-black opacity-70"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-luxe-black via-transparent to-transparent"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-1000 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'}`}
            >
              {index === currentSlide && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl"
                >
                  <h3 className="text-luxe-gold font-medium mb-2">{slide.subtitle}</h3>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg text-primary-200 mb-8 max-w-xl">{slide.description}</p>
                  <Link href={slide.link} className="btn-primary px-8 py-3 text-base">
                    {slide.cta}
                  </Link>
                </motion.div>
              )}
            </div>
          ))}

          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-luxe-gold w-8' : 'bg-primary-600 hover:bg-primary-500'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}