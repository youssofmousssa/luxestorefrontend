'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { FiShoppingBag, FiUser, FiHeart, FiMenu, FiX, FiSearch } from 'react-icons/fi'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const supabase = createClientComponentClient()
  const { items } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    getUser()

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setIsUserMenuOpen(false)
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-luxe-black/90 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <span className="text-luxe-gold">LUXE</span>
              <span>STORE</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'nav-link-active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-primary-800 transition-colors duration-200"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5 text-white" />
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="p-2 rounded-full hover:bg-primary-800 transition-colors duration-200 relative"
              aria-label="Wishlist"
            >
              <FiHeart className="w-5 h-5 text-white" />
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="p-2 rounded-full hover:bg-primary-800 transition-colors duration-200 relative"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="w-5 h-5 text-white" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxe-gold text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {/* User Icon/Profile */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 rounded-full hover:bg-primary-800 transition-colors duration-200"
                aria-label="User Menu"
              >
                <FiUser className="w-5 h-5 text-white" />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-primary-900 border border-primary-700 rounded-md shadow-lg py-1 z-50"
                  >
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-primary-700">
                          <p className="text-sm font-medium text-white truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          href="/account"
                          className="block px-4 py-2 text-sm text-primary-300 hover:bg-primary-800 hover:text-white"
                        >
                          Account
                        </Link>
                        <Link
                          href="/account/orders"
                          className="block px-4 py-2 text-sm text-primary-300 hover:bg-primary-800 hover:text-white"
                        >
                          Orders
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-primary-300 hover:bg-primary-800 hover:text-white"
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth/login"
                          className="block px-4 py-2 text-sm text-primary-300 hover:bg-primary-800 hover:text-white"
                        >
                          Sign in
                        </Link>
                        <Link
                          href="/auth/register"
                          className="block px-4 py-2 text-sm text-primary-300 hover:bg-primary-800 hover:text-white"
                        >
                          Create account
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full hover:bg-primary-800 transition-colors duration-200 md:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6 text-white" />
              ) : (
                <FiMenu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary-900 border-t border-primary-800 mt-2"
          >
            <nav className="container-custom py-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`block py-2 px-4 rounded-md ${
                        pathname === link.href
                          ? 'bg-primary-800 text-luxe-gold'
                          : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-primary-800 border-2 border-luxe-gold text-white py-3 px-4 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                  autoFocus
                />
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luxe-gold"
                  aria-label="Search"
                >
                  <FiSearch className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-primary-300 hover:text-white"
                >
                  Cancel
                </button>
                <div className="text-primary-400 text-sm">
                  Press ESC to close
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}