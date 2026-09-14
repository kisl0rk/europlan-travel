import React from 'react'
import { motion } from 'framer-motion'
import { Plane, MapPin, Globe, Passport, Landmark, AppWindow, Home, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navigation({ currentPage, onStartPlanning, onViewCountries, onHome }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', icon: Home, onClick: onHome },
    { label: 'Planner', icon: Plane, onClick: onStartPlanning },
    { label: 'Countries', icon: Globe, onClick: onViewCountries },
    { label: 'Visas', icon: Passport },
    { label: 'Attractions', icon: Landmark },
    { label: 'Apps', icon: AppWindow }
  ]

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onHome}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#0066cc] to-[#00a878] rounded-xl flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#1a1a1a] hidden sm:inline">EUROPLAN</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={item.onClick}
                className="flex items-center gap-2 text-gray-600 hover:text-[#0066cc] transition-colors text-sm font-medium"
                whileHover={{ y: -2 }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden sm:block">
            <motion.button
              onClick={onStartPlanning}
              className="btn-primary text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Planning →
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#1a1a1a]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1a1a1a]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick && item.onClick()
                  setMobileMenuOpen(false)
                }}
                className="w-full text-left px-4 py-2 text-gray-600 hover:text-[#0066cc] hover:bg-[#f5f5f5] rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            <motion.button
              onClick={() => {
                onStartPlanning()
                setMobileMenuOpen(false)
              }}
              className="w-full btn-primary mt-4"
              whileTap={{ scale: 0.95 }}
            >
              Start Planning →
            </motion.button>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
