'use client'

import MainLayout from '@/components/layouts/MainLayout'
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import NewsletterSection from '@/components/home/NewsletterSection'

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      
      {/* Luxury Redefined Section */}
      <section className="section bg-primary-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Luxury Redefined</h2>
            <p className="text-primary-300 max-w-3xl mx-auto">
              Experience the epitome of luxury with our curated collection of premium products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-primary-800/50 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-luxe-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-luxe-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-primary-300">
                Every product in our collection is crafted with exceptional materials and meticulous attention to detail.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-primary-800/50 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-luxe-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-luxe-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Designs</h3>
              <p className="text-primary-300">
                Discover unique pieces that stand out from the ordinary, curated for those who appreciate distinction.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-primary-800/50 backdrop-blur-sm rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-luxe-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-luxe-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Value Guarantee</h3>
              <p className="text-primary-300">
                We stand behind every purchase with exceptional service and a commitment to your complete satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Category Showcase */}
      <CategoryShowcase />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Newsletter Section */}
      <NewsletterSection />
    </MainLayout>
  )
}