import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero({ onStartPlanning }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Plan Your European Adventure</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1a1a1a] mb-6 leading-tight"
          >
            Explore Europe with
            <span className="bg-gradient-to-r from-[#0066cc] to-[#00a878] bg-clip-text text-transparent"> Confidence</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Get real-time visa requirements, travel safety updates, and personalized itineraries for your European journey
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              onClick={onStartPlanning}
              className="btn-primary text-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0, 102, 204, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Start Planning <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button
              className="px-8 py-4 border-2 border-gray-300 text-[#1a1a1a] font-semibold rounded-lg hover:border-[#0066cc] hover:text-[#0066cc] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center"
          >
            {[
              { number: '50+', label: 'Countries' },
              { number: '1000+', label: 'Attractions' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-2xl sm:text-3xl font-bold text-[#0066cc]">{stat.number}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Image Placeholder */}
        <motion.div
          variants={itemVariants}
          className="mt-16 relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-green-100">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600 font-medium">Interactive Europe Map</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  )
}
