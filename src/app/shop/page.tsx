'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/components/layouts/MainLayout'
import ProductCard from '@/components/shop/ProductCard'

// Mock data for products
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Artisan Leather Wallet',
    price: 129.99,
    originalPrice: 159.99,
    category: 'accessories',
    rating: 4.8,
    reviewCount: 124,
    image: '/images/products/wallet.jpg',
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    description: 'Handcrafted from premium Italian leather with meticulous attention to detail.',
    tags: ['leather', 'handmade', 'premium'],
    colors: ['brown', 'black', 'tan'],
    materials: ['leather'],
  },
  {
    id: '2',
    name: 'Precision Chronograph Watch',
    price: 349.99,
    originalPrice: null,
    category: 'watches',
    rating: 4.9,
    reviewCount: 86,
    image: '/images/products/watch.jpg',
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    description: 'Swiss-made precision chronograph with sapphire crystal and premium steel construction.',
    tags: ['chronograph', 'swiss', 'premium'],
    colors: ['silver', 'gold', 'black'],
    materials: ['stainless steel', 'sapphire crystal'],
  },
  {
    id: '3',
    name: 'Cashmere Blend Scarf',
    price: 89.99,
    originalPrice: 119.99,
    category: 'accessories',
    rating: 4.7,
    reviewCount: 52,
    image: '/images/products/scarf.jpg',
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    description: 'Ultra-soft cashmere blend scarf with elegant pattern design.',
    tags: ['cashmere', 'winter', 'soft'],
    colors: ['navy', 'burgundy', 'charcoal'],
    materials: ['cashmere', 'wool'],
  },
  {
    id: '4',
    name: 'Signature Cologne',
    price: 129.99,
    originalPrice: null,
    category: 'fragrance',
    rating: 4.6,
    reviewCount: 78,
    image: '/images/products/cologne.jpg',
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    description: 'Sophisticated fragrance with notes of bergamot, cedar, and amber.',
    tags: ['fragrance', 'luxury', 'signature'],
    colors: [],
    materials: [],
  },
  {
    id: '5',
    name: 'Italian Silk Tie',
    price: 79.99,
    originalPrice: 99.99,
    category: 'accessories',
    rating: 4.5,
    reviewCount: 41,
    image: '/images/products/tie.jpg',
    isNew: false,
    isFeatured: false,
    isOnSale: true,
    description: 'Hand-finished silk tie made in Italy with classic pattern.',
    tags: ['silk', 'italian', 'formal'],
    colors: ['blue', 'red', 'green'],
    materials: ['silk'],
  },
  {
    id: '6',
    name: 'Diamond Cufflinks',
    price: 249.99,
    originalPrice: null,
    category: 'jewelry',
    rating: 4.9,
    reviewCount: 28,
    image: '/images/products/cufflinks.jpg',
    isNew: true,
    isFeatured: true,
    isOnSale: false,
    description: 'Elegant sterling silver cufflinks with genuine diamond accents.',
    tags: ['diamond', 'silver', 'formal'],
    colors: ['silver'],
    materials: ['sterling silver', 'diamond'],
  },
  {
    id: '7',
    name: 'Leather Messenger Bag',
    price: 199.99,
    originalPrice: 249.99,
    category: 'bags',
    rating: 4.7,
    reviewCount: 63,
    image: '/images/products/bag.jpg',
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    description: 'Full-grain leather messenger bag with premium hardware and ample storage.',
    tags: ['leather', 'business', 'durable'],
    colors: ['brown', 'black'],
    materials: ['leather', 'brass'],
  },
  {
    id: '8',
    name: 'Aviator Sunglasses',
    price: 159.99,
    originalPrice: null,
    category: 'eyewear',
    rating: 4.6,
    reviewCount: 47,
    image: '/images/products/sunglasses.jpg',
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    description: 'Classic aviator design with polarized lenses and gold-tone frame.',
    tags: ['polarized', 'aviator', 'uv protection'],
    colors: ['gold', 'silver', 'black'],
    materials: ['metal', 'glass'],
  },
];

// Categories with images
const CATEGORIES = [
  { id: 'all', name: 'All Products', image: '/images/categories/all.jpg' },
  { id: 'accessories', name: 'Accessories', image: '/images/categories/accessories.jpg' },
  { id: 'watches', name: 'Watches', image: '/images/categories/watches.jpg' },
  { id: 'fragrance', name: 'Fragrance', image: '/images/categories/fragrance.jpg' },
  { id: 'jewelry', name: 'Jewelry', image: '/images/categories/jewelry.jpg' },
  { id: 'bags', name: 'Bags', image: '/images/categories/bags.jpg' },
  { id: 'eyewear', name: 'Eyewear', image: '/images/categories/eyewear.jpg' },
];

// Sort options
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

// Filter options
const FILTER_OPTIONS = {
  price: [
    { value: 'all', label: 'All Prices' },
    { value: 'under-100', label: 'Under $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: 'over-200', label: 'Over $200' },
  ],
  tags: [
    'leather',
    'handmade',
    'premium',
    'chronograph',
    'swiss',
    'cashmere',
    'silk',
    'italian',
    'diamond',
    'silver',
    'business',
    'polarized',
  ],
  colors: [
    { value: 'black', label: 'Black', hex: '#000000' },
    { value: 'brown', label: 'Brown', hex: '#964B00' },
    { value: 'tan', label: 'Tan', hex: '#D2B48C' },
    { value: 'navy', label: 'Navy', hex: '#000080' },
    { value: 'burgundy', label: 'Burgundy', hex: '#800020' },
    { value: 'charcoal', label: 'Charcoal', hex: '#36454F' },
    { value: 'silver', label: 'Silver', hex: '#C0C0C0' },
    { value: 'gold', label: 'Gold', hex: '#FFD700' },
    { value: 'blue', label: 'Blue', hex: '#0000FF' },
    { value: 'red', label: 'Red', hex: '#FF0000' },
    { value: 'green', label: 'Green', hex: '#008000' },
  ],
  availability: [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'on-sale', label: 'On Sale' },
    { value: 'new-arrivals', label: 'New Arrivals' },
  ],
};

type SortOption = typeof SORT_OPTIONS[number]['value'];
type FilterState = {
  category: string;
  price: string;
  tags: string[];
  colors: string[];
  availability: string[];
};

export default function ShopPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for products, filters, sorting, and pagination
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    price: 'all',
    tags: [],
    colors: [],
    availability: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Effect to handle URL params
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setActiveCategory(category);
    setFilters(prev => ({ ...prev, category }));
  }, [searchParams]);

  // Effect to filter and sort products
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      let result = [...MOCK_PRODUCTS];
      
      // Apply category filter
      if (filters.category !== 'all') {
        result = result.filter(product => product.category === filters.category);
      }
      
      // Apply price filter
      if (filters.price !== 'all') {
        switch (filters.price) {
          case 'under-100':
            result = result.filter(product => product.price < 100);
            break;
          case '100-200':
            result = result.filter(product => product.price >= 100 && product.price <= 200);
            break;
          case 'over-200':
            result = result.filter(product => product.price > 200);
            break;
        }
      }
      
      // Apply tag filters
      if (filters.tags.length > 0) {
        result = result.filter(product => 
          filters.tags.some(tag => product.tags.includes(tag))
        );
      }
      
      // Apply color filters
      if (filters.colors.length > 0) {
        result = result.filter(product => 
          filters.colors.some(color => product.colors.includes(color))
        );
      }
      
      // Apply availability filters
      if (filters.availability.length > 0) {
        result = result.filter(product => {
          return filters.availability.some(filter => {
            switch (filter) {
              case 'in-stock':
                return true; // All mock products are in stock
              case 'on-sale':
                return product.isOnSale;
              case 'new-arrivals':
                return product.isNew;
              default:
                return false;
            }
          });
        });
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'newest':
          result = result.filter(product => product.isNew).concat(result.filter(product => !product.isNew));
          break;
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'featured':
        default:
          result = result.filter(product => product.isFeatured).concat(result.filter(product => !product.isFeatured));
          break;
      }
      
      setFilteredProducts(result);
      setCurrentPage(1); // Reset to first page when filters change
      setIsLoading(false);
    }, 500); // Simulate network delay
    
    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setFilters(prev => ({ ...prev, category: categoryId }));
    router.push(`/shop?category=${categoryId}`, { scroll: false });
  };

  // Handle filter changes
  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    if (filterType === 'category' || filterType === 'price') {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    } else {
      setFilters(prev => {
        const currentValues = prev[filterType] as string[];
        if (currentValues.includes(value)) {
          return { ...prev, [filterType]: currentValues.filter(v => v !== value) };
        } else {
          return { ...prev, [filterType]: [...currentValues, value] };
        }
      });
    }
  };

  // Handle sort change
  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: activeCategory, // Keep the current category
      price: 'all',
      tags: [],
      colors: [],
      availability: [],
    });
    setSortBy('featured');
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <MainLayout>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Luxury Collection</h1>
            <p className="text-primary-300 max-w-2xl mx-auto">
              Discover our curated selection of premium products, crafted with exceptional materials and unparalleled attention to detail.
            </p>
          </div>

          {/* Categories Slider */}
          <div className="mb-12 overflow-hidden">
            <div className="flex space-x-4 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-primary-700 scrollbar-track-primary-900">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`flex-shrink-0 group relative overflow-hidden rounded-xl ${activeCategory === category.id ? 'ring-2 ring-luxe-gold' : ''}`}
                >
                  <div className="w-40 h-24 md:w-48 md:h-28 bg-primary-800 relative overflow-hidden">
                    {/* Category Image (placeholder) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/70 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-primary-700"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                      <h3 className={`text-sm font-medium transition-colors ${activeCategory === category.id ? 'text-luxe-gold' : 'text-white group-hover:text-luxe-gold'}`}>
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-primary-300 hover:text-luxe-gold transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {FILTER_OPTIONS.price.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          value={option.value}
                          checked={filters.price === option.value}
                          onChange={() => handleFilterChange('price', option.value)}
                          className="form-radio h-4 w-4 text-luxe-gold focus:ring-luxe-gold/50 border-primary-600 bg-primary-800"
                        />
                        <span className="ml-2 text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS.colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleFilterChange('colors', color.value)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${filters.colors.includes(color.value) ? 'ring-2 ring-offset-2 ring-offset-primary-800 ring-luxe-gold' : ''}`}
                        title={color.label}
                      >
                        <span 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: color.hex }}
                        ></span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Product Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleFilterChange('tags', tag)}
                        className={`px-3 py-1 rounded-full text-xs ${filters.tags.includes(tag) ? 'bg-luxe-gold text-black' : 'bg-primary-700 hover:bg-primary-600 text-white'}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Availability</h3>
                  <div className="space-y-2">
                    {FILTER_OPTIONS.availability.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={filters.availability.includes(option.value)}
                          onChange={() => handleFilterChange('availability', option.value)}
                          className="form-checkbox h-4 w-4 text-luxe-gold focus:ring-luxe-gold/50 border-primary-600 bg-primary-800 rounded"
                        />
                        <span className="ml-2 text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-primary-700">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-800 hover:bg-primary-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm4 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
                    </svg>
                    Filters
                  </button>

                  <div className="text-sm text-primary-300">
                    Showing <span className="font-medium text-white">{filteredProducts.length}</span> products
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                    className="appearance-none bg-primary-800 border border-primary-700 text-white rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-luxe-gold focus:border-luxe-gold"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="relative min-h-[400px]">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary-600 border-t-luxe-gold rounded-full animate-spin"></div>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-4 text-primary-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2">No Products Found</h3>
                    <p className="text-primary-300 max-w-md mx-auto mb-6">
                      We couldn't find any products matching your current filters. Try adjusting your filter criteria or browse our other collections.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-6 py-3 rounded-lg bg-luxe-gold hover:bg-luxe-gold/90 text-black font-medium transition-colors duration-200"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <AnimatePresence mode="wait">
                        {currentProducts.map((product) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ProductCard product={product} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-12">
                        <nav className="flex items-center space-x-2">
                          <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-primary-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                              key={number}
                              onClick={() => paginate(number)}
                              className={`w-10 h-10 rounded-lg ${currentPage === number ? 'bg-luxe-gold text-black font-medium' : 'bg-primary-800 text-white hover:bg-primary-700'}`}
                            >
                              {number}
                            </button>
                          ))}
                          
                          <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg bg-primary-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setIsFilterOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-primary-900 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 rounded-full hover:bg-primary-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-primary-300">
                    {filteredProducts.length} products
                  </span>
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-primary-300 hover:text-luxe-gold transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                {/* Mobile Category Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={filters.category === category.id}
                          onChange={() => {
                            handleFilterChange('category', category.id);
                            setActiveCategory(category.id);
                          }}
                          className="form-radio h-4 w-4 text-luxe-gold focus:ring-luxe-gold/50 border-primary-600 bg-primary-800"
                        />
                        <span className="ml-2 text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {FILTER_OPTIONS.price.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="price"
                          value={option.value}
                          checked={filters.price === option.value}
                          onChange={() => handleFilterChange('price', option.value)}
                          className="form-radio h-4 w-4 text-luxe-gold focus:ring-luxe-gold/50 border-primary-600 bg-primary-800"
                        />
                        <span className="ml-2 text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS.colors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleFilterChange('colors', color.value)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${filters.colors.includes(color.value) ? 'ring-2 ring-offset-2 ring-offset-primary-900 ring-luxe-gold' : ''}`}
                        title={color.label}
                      >
                        <span 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: color.hex }}
                        ></span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Product Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {FILTER_OPTIONS.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleFilterChange('tags', tag)}
                        className={`px-3 py-1 rounded-full text-xs ${filters.tags.includes(tag) ? 'bg-luxe-gold text-black' : 'bg-primary-700 hover:bg-primary-600 text-white'}`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Availability</h3>
                  <div className="space-y-2">
                    {FILTER_OPTIONS.availability.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={filters.availability.includes(option.value)}
                          onChange={() => handleFilterChange('availability', option.value)}
                          className="form-checkbox h-4 w-4 text-luxe-gold focus:ring-luxe-gold/50 border-primary-600 bg-primary-800 rounded"
                        />
                        <span className="ml-2 text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-3 rounded-lg bg-luxe-gold hover:bg-luxe-gold/90 text-black font-medium transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}