'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import MainLayout from '@/components/layouts/MainLayout'
import AuthForms from '@/components/auth/AuthForms'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      router.push('/account')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-luxe-gold rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <section className="section py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-luxe-gold/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-luxe-platinum/10 rounded-full blur-xl"></div>
                
                <div className="relative z-10 bg-gradient-to-br from-primary-800 to-primary-900 p-8 rounded-xl border border-primary-700/50">
                  <h2 className="text-3xl font-bold mb-6">Exclusive Benefits</h2>
                  
                  <ul className="space-y-4">
                    {[
                      'Access to limited edition products',
                      'Early access to new collections',
                      'Personalized shopping experience',
                      'Exclusive member-only discounts',
                      'Priority customer service',
                      'Free shipping on all orders',
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-luxe-gold">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-8 pt-6 border-t border-primary-700/50">
                    <p className="text-primary-300 italic">
                      "LuxeStore has transformed my shopping experience. The quality and exclusivity of their products is unmatched."
                    </p>
                    <div className="mt-2 font-medium">— Alexandra Chen, Fashion Designer</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AuthForms />
              
              <div className="mt-8 text-center text-sm text-primary-400">
                By signing in or creating an account, you agree to our{' '}
                <Link href="/terms" className="text-luxe-gold hover:text-luxe-gold/80 transition-colors duration-200">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-luxe-gold hover:text-luxe-gold/80 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}