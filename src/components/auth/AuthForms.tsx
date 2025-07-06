'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

type AuthMode = 'signin' | 'signup' | 'reset'

export default function AuthForms() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signIn, signUp, resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) throw error
        toast.success('Signed in successfully')
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          toast.error('Passwords do not match')
          return
        }
        const { error } = await signUp(email, password)
        if (error) throw error
        toast.success('Account created! Please check your email for verification.')
        setMode('signin')
      } else if (mode === 'reset') {
        const { error } = await resetPassword(email)
        if (error) throw error
        toast.success('Password reset link sent to your email')
        setMode('signin')
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-primary-700/50">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">
            {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
          </h2>
          <p className="text-primary-300">
            {mode === 'signin'
              ? 'Welcome back to LuxeStore'
              : mode === 'signup'
              ? 'Join the world of luxury'
              : 'We\'ll send you a reset link'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-200 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-primary-200 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={mode !== 'reset'}
                  className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-200 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={mode === 'signup'}
                  className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-lg bg-luxe-gold hover:bg-luxe-gold/90 text-black font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
              ) : mode === 'signin' ? (
                'Sign In'
              ) : mode === 'signup' ? (
                'Create Account'
              ) : (
                'Send Reset Link'
              )}
            </button>

            <div className="pt-4 text-center text-sm">
              {mode === 'signin' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setMode('reset')}
                    className="text-primary-300 hover:text-luxe-gold transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                  <div className="mt-4">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-luxe-gold hover:text-luxe-gold/80 transition-colors duration-200"
                    >
                      Sign up
                    </button>
                  </div>
                </>
              ) : mode === 'signup' ? (
                <div>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-luxe-gold hover:text-luxe-gold/80 transition-colors duration-200"
                  >
                    Sign in
                  </button>
                </div>
              ) : (
                <div>
                  Remember your password?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-luxe-gold hover:text-luxe-gold/80 transition-colors duration-200"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </motion.form>
        </AnimatePresence>
      </div>
    </div>
  )
}