'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Alexandra Chen',
    title: 'Fashion Designer',
    quote: 'LuxeStore has completely transformed my shopping experience. The quality of their products is unmatched, and their attention to detail is evident in everything they offer.',
    avatar: '/images/testimonials/avatar-1.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Williams',
    title: 'Executive Director',
    quote: 'I've been a loyal customer for years, and LuxeStore never disappoints. Their curated selection saves me time, and the premium quality ensures I always make a statement.',
    avatar: '/images/testimonials/avatar-2.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sophia Rodriguez',
    title: 'Interior Designer',
    quote: 'The home collection at LuxeStore has been my secret weapon for client projects. Exceptional craftsmanship and unique designs that you simply can't find elsewhere.',
    avatar: '/images/testimonials/avatar-3.jpg',
    rating: 4,
  },
  {
    id: 4,
    name: 'James Thompson',
    title: 'Tech Entrepreneur',
    quote: 'Their electronics collection perfectly balances cutting-edge technology with sophisticated design. LuxeStore understands that luxury is about both form and function.',
    avatar: '/images/testimonials/avatar-4.jpg',
    rating: 5,
  },
  {
    id: 5,
    name: 'Olivia Parker',
    title: 'Art Curator',
    quote: 'Every piece I've purchased from LuxeStore feels like a work of art. Their commitment to quality and aesthetic excellence resonates with my professional standards.',
    avatar: '/images/testimonials/avatar-5.jpg',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
    setIsAutoplay(false)
  }

  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        handleNext()
      }, 5000)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [isAutoplay])

  return (
    <section className="section bg-gradient-to-b from-luxe-black to-primary-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">What Our Clients Say</h2>
          <p className="text-primary-300 max-w-3xl mx-auto">
            Discover why our discerning customers choose LuxeStore for their premium shopping experience.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-primary-800/50 backdrop-blur-sm rounded-lg p-8 md:p-10 text-center">
                      <div className="flex justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-luxe-gold' : 'text-primary-600'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <blockquote className="text-xl md:text-2xl font-serif text-white italic mb-8">
                        "{testimonial.quote}"
                      </blockquote>