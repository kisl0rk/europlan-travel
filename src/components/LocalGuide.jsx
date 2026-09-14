import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Clock, DollarSign, Users, Globe, Phone, Award } from 'lucide-react'

export default function LocalGuide({ destination }) {
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [filter, setFilter] = useState('all')

  const guidesData = {
    'France': [
      {
        id: 1,
        name: 'Marie Laurent',
        specialty: 'Art & Culture',
        rating: 4.9,
        reviews: 287,
        price: 75,
        language: ['French', 'English', 'Spanish'],
        experience: '12 years',
        bio: 'Expert in Parisian history and art. Specializes in museum tours and hidden gems.',
        image: '👩‍🎨',
        availability: 'Available this week',
      },
      {
        id: 2,
        name: 'Jean Dubois',
        specialty: 'Food & Wine',
        rating: 4.8,
        reviews: 156,
        price: 85,
        language: ['French', 'English', 'German'],
        experience: '8 years',
        bio: 'Wine expert and gourmet chef. Offers authentic French culinary experiences.',
        image: '👨‍🍳',
        availability: 'Available weekends',
      },
      {
        id: 3,
        name: 'Sophie Martin',
        specialty: 'Walking Tours',
        rating: 4.7,
        reviews: 203,
        price: 60,
        language: ['French', 'English', 'Italian'],
        experience: '10 years',
        bio: 'Passionate about Paris neighborhoods. Leads immersive walking experiences.',
        image: '👩‍🦰',
        availability: 'Available daily',
      },
    ],
    'Italy': [
      {
        id: 1,
        name: 'Marco Rossi',
        specialty: 'History & Architecture',
        rating: 4.9,
        reviews: 312,
        price: 80,
        language: ['Italian', 'English', 'French'],
        experience: '15 years',
        bio: 'Renowned guide specializing in Roman history and Renaissance art.',
        image: '👨‍🏫',
        availability: 'Available this week',
      },
      {
        id: 2,
        name: 'Giulia Rossi',
        specialty: 'Local Culture',
        rating: 4.8,
        reviews: 178,
        price: 70,
        language: ['Italian', 'English'],
        experience: '7 years',
        bio: 'Connect with authentic Italian lifestyle and hidden local spots.',
        image: '👩‍🎤',
        availability: 'Available weekdays',
      },
      {
        id: 3,
        name: 'Antonio Bellini',
        specialty: 'Food Tours',
        rating: 4.7,
        reviews: 234,
        price: 90,
        language: ['Italian', 'English', 'Spanish'],
        experience: '11 years',
        bio: 'Expert in Italian cuisine. Leads market tours and cooking classes.',
        image: '👨‍⚕️',
        availability: 'Available mornings',
      },
    ],
    'Spain': [
      {
        id: 1,
        name: 'Carlos García',
        specialty: 'Architecture & Design',
        rating: 4.9,
        reviews: 298,
        price: 75,
        language: ['Spanish', 'English', 'Catalan'],
        experience: '13 years',
        bio: 'Gaudí expert and modern Barcelona guide. Exclusive architectural insights.',
        image: '👨‍🎨',
        availability: 'Available this week',
      },
      {
        id: 2,
        name: 'Isabella Santos',
        specialty: 'Street Art & Culture',
        rating: 4.8,
        reviews: 189,
        price: 65,
        language: ['Spanish', 'English', 'Portuguese'],
        experience: '9 years',
        bio: 'Street art and contemporary culture enthusiast. Off-the-beaten-path tours.',
        image: '👩‍🎨',
        availability: 'Available daily',
      },
      {
        id: 3,
        name: 'Miguel López',
        specialty: 'Flamenco & Tapas',
        rating: 4.6,
        reviews: 167,
        price: 80,
        language: ['Spanish', 'English'],
        experience: '8 years',
        bio: 'Flamenco expert and foodie. Authentic Spanish nightlife and cuisine.',
        image: '👨‍🎵',
        availability: 'Available evenings',
      },
    ],
  }

  const guides = guidesData[destination] || []
  const specialties = ['all', ...new Set(guides.map(g => g.specialty))]

  const filteredGuides = filter === 'all' ? guides : guides.filter(g => g.specialty === filter)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
              <Award className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">Local Guides in {destination}</h2>
              <p className="text-gray-600">Meet experienced guides for personalized tours</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-6">
            {specialties.map(specialty => (
              <motion.button
                key={specialty}
                onClick={() => setFilter(specialty)}
                className={`px-4 py-2 rounded-full font-semibold transition-all capitalize ${
                  filter === specialty
                    ? 'bg-[#0066cc] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {specialty}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Guides Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredGuides.map(guide => (
            <motion.div
              key={guide.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              variants={cardVariants}
              onClick={() => setSelectedGuide(guide)}
              whileHover={{ y: -4 }}
            >
              {/* Avatar */}
              <div className="h-32 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-6xl">
                {guide.image}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Name & Specialty */}
                <div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{guide.name}</h3>
                  <p className="text-sm font-semibold text-[#0066cc]">{guide.specialty}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(guide.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#0066cc]">{guide.rating}</span>
                  <span className="text-xs text-gray-600">({guide.reviews} reviews)</span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Price</p>
                      <p className="text-sm font-semibold text-[#1a1a1a]">${guide.price}/hr</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-600">Experience</p>
                      <p className="text-sm font-semibold text-[#1a1a1a]">{guide.experience}</p>
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    Languages
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {guide.language.map(lang => (
                      <span key={lang} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability Badge */}
                <div className="p-2 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-800 font-semibold text-center">
                    ✓ {guide.availability}
                  </p>
                </div>

                {/* View Details Button */}
                <motion.button
                  className="w-full py-2 bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detail Modal */}
        {selectedGuide && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedGuide(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full p-8 space-y-6"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Guide Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{selectedGuide.image}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#1a1a1a]">{selectedGuide.name}</h3>
                    <p className="text-lg font-semibold text-[#0066cc]">{selectedGuide.specialty}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{selectedGuide.rating}</span>
                      <span className="text-gray-600">({selectedGuide.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="text-gray-600 hover:text-[#1a1a1a] text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Bio */}
              <div>
                <h4 className="font-semibold text-[#1a1a1a] mb-2">About</h4>
                <p className="text-gray-700 leading-relaxed">{selectedGuide.bio}</p>
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Price per Hour</p>
                  <p className="text-2xl font-bold text-[#0066cc]">${selectedGuide.price}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Experience</p>
                  <p className="text-2xl font-bold text-green-600">{selectedGuide.experience}</p>
                </div>
              </div>

              {/* Languages */}
              <div>
                <h4 className="font-semibold text-[#1a1a1a] mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGuide.language.map(lang => (
                    <span key={lang} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="font-semibold text-green-900 mb-1">✓ Available</p>
                <p className="text-green-800">{selectedGuide.availability}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  className="flex-grow py-3 bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Tour
                </motion.button>
                <motion.button
                  className="flex-grow py-3 border-2 border-gray-200 text-[#0066cc] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Message
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
