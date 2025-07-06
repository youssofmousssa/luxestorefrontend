'use client'

import { createContext, useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/hooks/useAuth'

// Theme context
type ThemeContextType = {
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
})

export default function Providers({ children }: { children: React.ReactNode }) {
  // Always use dark theme for this project
  const [theme] = useState<'dark' | 'light'>('dark')

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
      <AuthProvider>
        {children}
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #333',
            },
          }}
        />
      </AuthProvider>
    </ThemeContext.Provider>
  )
}