rom f'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import MainLayout from '@/components/layouts/MainLayout'
import { useAuth } from '@/hooks/useAuth'

type AccountTab = 'profile' | 'orders' | 'wishlist' | 'settings'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>('profile')
  const { user, profile, isLoading, signOut, updateProfile } = useAuth()
  const router = useRouter()

  // Form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }

    if (profile) {
      setFirstName(profile.first_name || '')
      setLastName(profile.last_name || '')
      setPhone(profile.phone || '')
      setAddressLine1(profile.address_line1 || '')
      setAddressLine2(profile.address_line2 || '')
      setCity(profile.city || '')
      setState(profile.state || '')
      setPostalCode(profile.postal_code || '')
      setCountry(profile.country || '')
    }
  }, [isLoading, user, profile, router])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)

    try {
      const { error } = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone,
        address_line1: addressLine1,
        address_line2: addressLine2,
        city,
        state,
        postal_code: postalCode,
        country,
      })

      if (error) throw error
      toast.success('Profile updated successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    toast.success('Signed out successfully')
  }

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
      <section className="section py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={`${profile.first_name || 'User'}'s avatar`} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-light text-primary-300">
                        {profile?.first_name?.[0] || profile?.email?.[0] || 'U'}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-xl">
                    {profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}` : 'Welcome'}
                  </h3>
                  <p className="text-primary-300 text-sm mt-1">{user?.email}</p>
                </div>

                <nav>
                  <ul className="space-y-2">
                    {[
                      { id: 'profile', label: 'Profile', icon: 'user' },
                      { id: 'orders', label: 'Orders', icon: 'shopping-bag' },
                      { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
                      { id: 'settings', label: 'Settings', icon: 'cog' },
                    ].map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => setActiveTab(item.id as AccountTab)}
                          className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors duration-200 ${activeTab === item.id ? 'bg-luxe-gold/10 text-luxe-gold' : 'hover:bg-primary-700/50'}`}
                        >
                          <span className="w-5 h-5 mr-3">
                            {item.icon === 'user' && (
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            )}
                            {item.icon === 'shopping-bag' && (
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            )}
                            {item.icon === 'heart' && (
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            )}
                            {item.icon === 'cog' && (
                              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )}
                          </span>
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-8 pt-6 border-t border-primary-700">
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 rounded-lg text-left flex items-center text-red-400 hover:bg-red-400/10 transition-colors duration-200"
                  >
                    <span className="w-5 h-5 mr-3">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </span>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                      
                      <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-primary-200 mb-1">
                              First Name
                            </label>
                            <input
                              id="firstName"
                              type="text"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                              placeholder="John"
                              disabled={isUpdating}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-primary-200 mb-1">
                              Last Name
                            </label>
                            <input
                              id="lastName"
                              type="text"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                              placeholder="Doe"
                              disabled={isUpdating}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-primary-200 mb-1">
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={user?.email || ''}
                            readOnly
                            className="w-full h-12 px-4 rounded-lg bg-primary-900/50 border border-primary-700 text-primary-300 cursor-not-allowed"
                          />
                          <p className="mt-1 text-xs text-primary-400">Email cannot be changed</p>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-primary-200 mb-1">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                            placeholder="+1 (555) 123-4567"
                            disabled={isUpdating}
                          />
                        </div>
                        
                        <div className="border-t border-primary-700 pt-6">
                          <h3 className="text-xl font-bold mb-4">Shipping Address</h3>
                          
                          <div className="space-y-6">
                            <div>
                              <label htmlFor="addressLine1" className="block text-sm font-medium text-primary-200 mb-1">
                                Address Line 1
                              </label>
                              <input
                                id="addressLine1"
                                type="text"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                                placeholder="123 Main St"
                                disabled={isUpdating}
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="addressLine2" className="block text-sm font-medium text-primary-200 mb-1">
                                Address Line 2 (Optional)
                              </label>
                              <input
                                id="addressLine2"
                                type="text"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                                className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                                placeholder="Apt 4B"
                                disabled={isUpdating}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="city" className="block text-sm font-medium text-primary-200 mb-1">
                                  City
                                </label>
                                <input
                                  id="city"
                                  type="text"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                                  placeholder="New York"
                                  disabled={isUpdating}
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="state" className="block text-sm font-medium text-primary-200 mb-1">
                                  State / Province
                                </label>
                                <input
                                  id="state"
                                  type="text"
                                  value={state}
                                  onChange={(e) => setState(e.target.value)}
                                  className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                                  placeholder="NY"
                                  disabled={isUpdating}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="postalCode" className="block text-sm font-medium text-primary-200 mb-1">
                                  Postal / ZIP Code
                                </label>
                                <input
                                  id="postalCode"
                                  type="text"
                                  value={postalCode}
                                  onChange={(e) => setPostalCode(e.target.value)}
                                  className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                                  placeholder="10001"
                                  disabled={isUpdating}
                                />
                              </div>
                              
                              <div>
                                <label htmlFor="country" className="block text-sm font-medium text-primary-200 mb-1">
                                  Country
                                </label>
                                <input
                                  id="country"
                                  type="text"
                                  value={country}
                                  onChange={(e) => setCountry(e.target.value)}
                                  className="w-full h-12 px-4 rounded-lg bg-primary-900 border border-primary-700 focus:border-luxe-gold focus:ring-1 focus:ring-luxe-gold/50 text-white placeholder-primary-400 transition-all duration-200"
                                  placeholder="United States"
                                  disabled={isUpdating}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isUpdating}
                            className="h-12 px-8 rounded-lg bg-luxe-gold hover:bg-luxe-gold/90 text-black font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            {isUpdating ? (
                              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                            ) : (
                              'Save Changes'
                            )}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {activeTab === 'orders' && (
                    <motion.div
                      key="orders"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
                      
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 text-primary-400">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
                        <p className="text-primary-300 max-w-md mx-auto mb-6">
                          You haven't placed any orders yet. Browse our collection and find something you'll love.
                        </p>
                        <button
                          onClick={() => router.push('/shop')}
                          className="px-6 py-3 rounded-lg bg-luxe-gold hover:bg-luxe-gold/90 text-black font-medium transition-colors duration-200"
                        >
                          Start Shopping
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'wishlist' && (
                    <motion.div
                      key="wishlist"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
                      
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 text-primary-400">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Your Wishlist is Empty</h3>
                        <p className="text-primary-300 max-w-md mx-auto mb-6">
                          Save your favorite items to your wishlist for easy access later.
                        </p>
                        <button
                          onClick={() => router.push('/shop')}
                          className="px-6 py-3 rounded-lg bg-luxe-gold hover:bg-luxe-gold/90 text-black font-medium transition-colors duration-200"
                        >
                          Explore Products
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-primary-900/50 rounded-lg p-6 border border-primary-700">
                          <h3 className="text-xl font-bold mb-4">Change Password</h3>
                          <p className="text-primary-300 mb-4">
                            For security reasons, we'll send you an email with a link to reset your password.
                          </p>
                          <button
                            onClick={() => router.push('/login?tab=reset')}
                            className="px-6 py-3 rounded-lg bg-primary-700 hover:bg-primary-600 transition-colors duration-200"
                          >
                            Reset Password
                          </button>
                        </div>
                        
                        <div className="bg-red-900/10 rounded-lg p-6 border border-red-800/20">
                          <h3 className="text-xl font-bold mb-4 text-red-400">Delete Account</h3>
                          <p className="text-primary-300 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <button
                            className="px-6 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-200"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}