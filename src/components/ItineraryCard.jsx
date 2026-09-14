import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Users, ArrowRight, Heart } from 'lucide-react'

export default function ItineraryCard({ itinerary, onView }) {
  const [isFavorited, setIsFavorited] = React.useState(false)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -8,
      boxShadow: '0 20px 40px rgba(0, 102, 204, 0.15)',
      transition: { duration: 0.3 },
    },
  }

  const getDurationDays = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
  }

  const getBudgetDisplay = (budget) => {
    const budgetMap = {
      budget: '€€ Budget-Friendly',
      medium: '€€€ Medium',
      luxury: '€€€€ Luxury',
    }
    return budgetMap[budget] || budget
  }

  const getInterestTags = (interests) => {
    const interestMap = {
      culture: '🏛️ Culture',
      nature: '🏞️ Nature',
      food: '🍷 Food & Wine',
      adventure: '🎯 Adventure',
      nightlife: '🌙 Nightlife',
      relax: '🧘 Relaxation',
    }
    return interests.map(id => interestMap[id] || id).slice(0, 3)
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Card Header with Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-green-400 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl">🗺️</div>
        </div>
        <motion.button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart
            className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </motion.button>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        {/* Destination */}
        <div>
          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0066cc]" />
            {itinerary.destination}
          </h3>
          <p className="text-sm text-gray-600">Personalized European Adventure</p>
        </div>

        {/* Trip Details Grid */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-100">
          {/* Duration */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#0066cc] font-semibold">
              <Clock className="w-4 h-4" />
              <span>{getDurationDays(itinerary.startDate, itinerary.endDate)} Days</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {new Date(itinerary.startDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })} -{' '}
              {new Date(itinerary.endDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Budget */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[#00a878] font-semibold">
              <DollarSign className="w-4 h-4" />
              <span>{itinerary.budget}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {getBudgetDisplay(itinerary.budget)}
            </p>
          </div>

          {/* Travelers */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-purple-600 font-semibold">
              <Users className="w-4 h-4" />
              <span>{itinerary.travelers}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {itinerary.travelers === '1' ? 'Traveler' : 'Travelers'}
            </p>
          </div>
        </div>

        {/* Interests Tags */}
        <div className="space-y-2 border-t border-gray-100 pt-4">
          <p className="text-xs font-semibold text-gray-700 uppercase">Interests</p>
          <div className="flex flex-wrap gap-2">
            {getInterestTags(itinerary.interests).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-sm text-blue-700 font-medium"
              >
                {tag}
              </span>
            ))}
            {itinerary.interests.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 text-sm text-gray-600">
                +{itinerary.interests.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* View Button */}
        <motion.button
          onClick={() => onView(itinerary)}
          className="w-full mt-4 py-3 bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white font-semibold rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Itinerary
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
