'use client'

import Link from 'next/link'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/shop' },
        { name: 'New Arrivals', href: '/shop/new-arrivals' },
        { name: 'Featured', href: '/shop/featured' },
        { name: 'Bestsellers', href: '/shop/bestsellers' },
        { name: 'Sale', href: '/shop/sale' },
      ],
    },
    {
      title: 'Information',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Blog', href: '/blog' },
        { name: 'FAQs', href: '/faqs' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Shipping & Returns', href: '/shipping-returns' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms & Conditions', href: '/terms-conditions' },
        { name: 'Track Order', href: '/track-order' },
      ],
    },
  ]

  return (
    <footer className="bg-luxe-darker pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="text-luxe-gold">LUXE</span>
                <span>STORE</span>
              </h2>
            </Link>
            <p className="text-primary-300 mb-6 max-w-md">
              Discover the epitome of luxury shopping with our curated collection of premium products. Elevate your lifestyle with LuxeStore.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-primary-300 hover:bg-luxe-gold hover:text-black transition-colors duration-200"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-primary-300 hover:bg-luxe-gold hover:text-black transition-colors duration-200"
                aria-label="Twitter"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-primary-300 hover:bg-luxe-gold hover:text-black transition-colors duration-200"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-primary-300 hover:bg-luxe-gold hover:text-black transition-colors duration-200"
                aria-label="YouTube"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-semibold text-white mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-primary-300 hover:text-luxe-gold transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} LuxeStore. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <img
                src="/images/payment-visa.svg"
                alt="Visa"
                className="h-6"
                width={40}
                height={24}
              />
              <img
                src="/images/payment-mastercard.svg"
                alt="Mastercard"
                className="h-6"
                width={40}
                height={24}
              />
              <img
                src="/images/payment-amex.svg"
                alt="American Express"
                className="h-6"
                width={40}
                height={24}
              />
              <img
                src="/images/payment-paypal.svg"
                alt="PayPal"
                className="h-6"
                width={40}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}