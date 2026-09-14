import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Star, Heart, Share2, Ticket, Users, Camera } from 'lucide-react'

export default function AttractionGuide({ destination }) {
  const [favorites, setFavorites] = useState([])
  const [selectedAttraction, setSelectedAttraction] = useState(null)
  const [filter, setFilter] = useState('all')

  const attractionsData = {
    'France': [
      {
        id: 1,
        name: 'Eiffel Tower',
        category: 'Landmark',
        rating: 4.7,
        reviews: 15234,
        price: 'Free - $30',
        duration: '2-3 hours',
        description: 'Iconic iron lattice tower offering panoramic views of Paris. A must-see monument built for the 1889 World\'s Fair.',
        hours: '9:00 AM - 12:45 AM',
        bestTime: 'Sunset (6-8 PM)',
        tips: ['Book tickets online to skip queues', 'Visit at sunset for stunning views', 'Wear comfortable shoes'],
        image: '🗼',
      },
      {
        id: 2,
        name: 'Louvre Museum',
        category: 'Museum',
        rating: 4.6,
        reviews: 9847,
        price: '$17-$25',
        duration: '3-4 hours',
        description: 'World\'s largest art museum housing the Mona Lisa and Venus de Milo. A treasure trove of world-class art.',
        hours: '9:00 AM - 6:00 PM (Closed Tuesdays)',
        bestTime: 'Wednesday evenings (open until 9:45 PM)',
        tips: ['Get a museum guide or app', 'Come early to avoid crowds', 'Focus on key masterpieces'],
        image: '🎨',
      },
      {
        id: 3,
        name: 'Notre-Dame Cathedral',
        category: 'Historical',
        rating: 4.5,
        reviews: 8932,
        price: 'Free',
        duration: '1-2 hours',
        description: 'Magnificent Gothic cathedral with stunning architecture. Famous for its rose windows and flying buttresses.',
        hours: '8:00 AM - 6:45 PM',
        bestTime: 'Early morning for fewer crowds',
        tips: ['Climb the towers for city views', 'Visit the crypt', 'Attend evening services for ambiance'],
        image: '⛪',
      },
      {
        id: 4,
        name: 'Arc de Triomphe',
        category: 'Landmark',
        rating: 4.4,
        reviews: 7654,
        price: '$12-$15',
        duration: '1-2 hours',
        description: 'Triumphal arch honoring those who fought for France. Features panoramic views from the top.',
        hours: '10:00 AM - 10:30 PM',
        bestTime: 'Late afternoon for golden hour photography',
        tips: ['Take the elevator to save energy', 'Explore the area around Champs-Élysées', 'Come at sunset'],
        image: '🏛️',
      },
      {
        id: 5,
        name: 'Sacré-Cœur Basilica',
        category: 'Religious',
        rating: 4.5,
        reviews: 6789,
        price: 'Free (Dome €6)',
        duration: '1.5-2 hours',
        description: 'Stunning white basilica atop Montmartre with breathtaking city views. Romanesque-Byzantine architecture.',
        hours: '6:00 AM - 10:30 PM',
        bestTime: 'Morning for peaceful atmosphere',
        tips: ['Climb to the dome for views', 'Explore Montmartre neighborhood', 'Visit at sunrise'],
        image: '⛩️',
      },
      {
        id: 6,
        name: 'Versailles Palace',
        category: 'Palace',
        rating: 4.6,
        reviews: 5432,
        price: '$20-$27',
        duration: '4-5 hours',
        description: 'Former royal residence with opulent rooms and expansive gardens. UNESCO World Heritage site.',
        hours: '9:00 AM - 6:30 PM (Closed Mondays)',
        bestTime: 'Tuesday to Thursday for fewer crowds',
        tips: ['Rent a bike to explore gardens', 'Book skip-the-line tickets', 'Allocate full day for exploration'],
        image: '👑',
      },
    ],
    'Italy': [
      {
        id: 1,
        name: 'Colosseum',
        category: 'Historical',
        rating: 4.7,
        reviews: 12456,
        price: '$18-$24',
        duration: '2-3 hours',
        description: 'Ancient Roman amphitheater and engineering marvel. Once hosted gladiator battles and public spectacles.',
        hours: '8:30 AM - 7:00 PM',
        bestTime: 'Early morning or late afternoon',
        tips: ['Book tickets with Roman Forum combo', 'Hire a guide for history', 'Wear sunscreen and hat'],
        image: '🏛️',
      },
      {
        id: 2,
        name: 'Vatican Museums',
        category: 'Museum',
        rating: 4.6,
        reviews: 8765,
        price: '$21-$32',
        duration: '3-4 hours',
        description: 'Vast collection of art and artifacts accumulated by popes. Home to Michelangelo\'s Sistine Chapel ceiling.',
        hours: '9:00 AM - 6:00 PM (Closed Sundays)',
        bestTime: 'Book early morning or late afternoon slots',
        tips: ['Skip-the-line tickets essential', 'Hire headphones/guide', 'Dress modestly for Sistine Chapel'],
        image: '🎨',
      },
      {
        id: 3,
        name: 'Trevi Fountain',
        category: 'Landmark',
        rating: 4.5,
        reviews: 11234,
        price: 'Free',
        duration: '30 minutes - 1 hour',
        description: 'Baroque masterpiece and one of Rome\'s most iconic fountains. Toss a coin to ensure your return to Rome.',
        hours: '24 hours',
        bestTime: 'Early morning (before 8 AM)',
        tips: ['Avoid peak tourist hours', 'Explore surrounding cafes', 'Watch for pickpockets in crowds'],
        image: '⛲',
      },
      {
        id: 4,
        name: 'Uffizi Gallery',
        category: 'Museum',
        rating: 4.6,
        reviews: 6543,
        price: '$13-$20',
        duration: '2-3 hours',
        description: 'Florence\'s premier art museum with Renaissance masterpieces. Houses works by Botticelli and Leonardo da Vinci.',
        hours: '8:15 AM - 6:50 PM (Closed Mondays)',
        bestTime: 'Tuesday to Thursday mornings',
        tips: ['Pre-book tickets online', 'Join guided tour', 'Allow time for highlights'],
        image: '🎨',
      },
      {
        id: 5,
        name: 'Venice Grand Canal',
        category: 'Natural',
        rating: 4.4,
        reviews: 7890,
        price: 'Free',
        duration: '1-2 hours',
        description: 'Main waterway of Venice with stunning palaces and bridges. Best explored by gondola or vaporetto.',
        hours: '24 hours',
        bestTime: 'Evening for romantic ambiance',
        tips: ['Take vaporetto (water bus) for affordability', 'Gondola rides are pricey but memorable', 'Explore side canals'],
        image: '🚤',
      },
      {
        id: 6,
        name: 'Florence Cathedral',
        category: 'Religious',
        rating: 4.5,
        reviews: 5678,
        price: 'Free (Dome €18)',
        duration: '1.5-2 hours',
        description: 'Stunning Renaissance cathedral with iconic red dome. Climb to the top for city views.',
        hours: '10:00 AM - 5:00 PM (Reduced hours Sundays)',
        bestTime: 'Morning for pleasant temperatures',
        tips: ['Climb the dome for views', 'Book dome tickets in advance', 'Wear comfortable shoes'],
        image: '⛪',
      },
    ],
    'Spain': [
      {
        id: 1,
        name: 'Sagrada Familia',
        category: 'Religious',
        rating: 4.7,
        reviews: 11234,
        price: '$27-$39',
        duration: '2-3 hours',
        description: 'Gaudí\'s masterpiece basilica with unique Modernist architecture. Still under construction since 1883.',
        hours: '9:00 AM - 8:00 PM',
        bestTime: 'Morning or late afternoon for better light',
        tips: ['Book tickets with tower access', 'Hire audio guide', 'Come back at night to see lighting'],
        image: '⛪',
      },
      {
        id: 2,
        name: 'Park Güell',
        category: 'Park',
        rating: 4.6,
        reviews: 9876,
        price: '$14-$20',
        duration: '1.5-2 hours',
        description: 'Colorful mosaic park designed by Gaudí. Features terraces, sculptures, and panoramic city views.',
        hours: '8:00 AM - 9:00 PM',
        bestTime: 'Early morning to avoid crowds',
        tips: ['Timed tickets required', 'Wear comfortable walking shoes', 'Bring water and snacks'],
        image: '🎨',
      },
      {
        id: 3,
        name: 'Alhambra Palace',
        category: 'Palace',
        rating: 4.7,
        reviews: 8765,
        price: '$15-$21',
        duration: '3-4 hours',
        description: 'Stunning Islamic palace with intricate tilework and gardens. UNESCO World Heritage site in Granada.',
        hours: '8:30 AM - 6:00 PM',
        bestTime: 'Spring or fall for pleasant weather',
        tips: ['Book well in advance', 'Hire a guide for details', 'Visit Patio de los Leones'],
        image: '👑',
      },
      {
        id: 4,
        name: 'Prado Museum',
        category: 'Museum',
        rating: 4.5,
        reviews: 5432,
        price: '$15-$18',
        duration: '2-3 hours',
        description: 'One of the finest art museums in the world. Houses masterpieces by Velázquez, Goya, and Bosch.',
        hours: '10:00 AM - 8:00 PM (Closed Mondays)',
        bestTime: 'Weekday mornings',
        tips: ['Rent an audio guide', 'Focus on top galleries', 'Plan time for highlights'],
        image: '🎨',
      },
      {
        id: 5,
        name: 'Gothic Quarter',
        category: 'Neighborhood',
        rating: 4.4,
        reviews: 6543,
        price: 'Free',
        duration: '2-3 hours',
        description: 'Medieval neighborhood with narrow streets, historic buildings, and charming plazas.',
        hours: '24 hours',
        bestTime: 'Evening for atmosphere',
        tips: ['Get lost in the streets', 'Visit cathedral', 'Explore local shops and cafes'],
        image: '🏰',
      },
      {
        id: 6,
        name: 'Montjuïc Magic Fountain',
        category: 'Entertainment',
        rating: 4.3,
        reviews: 4321,
        price: 'Free',
        duration: '30-45 minutes',
        description: 'Spectacular fountain show with water, lights, and music. Perfect evening entertainment.',
        hours: 'Shows Thu-Sun 9:00 PM (check schedule)',
        bestTime: 'Weekend evenings',
        tips: ['Arrive early for good spot', 'Bring blanket or chair', 'Combine with nearby museums'],
        image: '💧',
      },
    ],
  }

  const attractions = attractionsData[destination] || []
  const categories = ['all', ...new Set(attractions.map(a => a.category))]

  const filteredAttractions = filter === 'all' 
    ? attractions 
    : attractions.filter(a => a.category === filter)

  const isFavorite = (id) => favorites.includes(id)

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

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
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">Top Attractions in {destination}</h2>
              <p className="text-gray-600">Discover must-see attractions and hidden gems</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-all capitalize ${
                  filter === cat
                    ? 'bg-[#0066cc] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Attractions Grid */}
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
          {filteredAttractions.map(attraction => (
            <motion.div
              key={attraction.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              variants={cardVariants}
              onClick={() => setSelectedAttraction(attraction)}
              whileHover={{ y: -4 }}
            >
              {/* Header with Image */}
              <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-6xl relative">
                {attraction.image}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(attraction.id)
                  }}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(attraction.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Title */}
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-lg font-bold text-[#1a1a1a]">{attraction.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {attraction.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{attraction.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(attraction.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#0066cc]">
                    {attraction.rating} ({attraction.reviews} reviews)
                  </span>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-2 py-2 border-y border-gray-100">
                  <div className="flex items-center gap-2 text-xs">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-[#1a1a1a]">{attraction.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-[#1a1a1a]">{attraction.duration}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <motion.button
                  className="w-full py-2 bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white font-semibold rounded-lg hover:shadow-lg transition-shadow text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detail Modal */}
        {selectedAttraction && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedAttraction(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto space-y-6"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl">{selectedAttraction.image}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1a1a1a]">{selectedAttraction.name}</h3>
                      <p className="text-[#0066cc] font-semibold">{selectedAttraction.category}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="text-gray-600 hover:text-[#1a1a1a] text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedAttraction.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-[#0066cc]">
                  {selectedAttraction.rating} ({selectedAttraction.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{selectedAttraction.description}</p>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-gray-600">Price</p>
                  </div>
                  <p className="text-lg font-bold text-[#0066cc]">{selectedAttraction.price}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                  <p className="text-lg font-bold text-green-600">{selectedAttraction.duration}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-gray-600">Hours</p>
                  </div>
                  <p className="text-sm font-semibold text-purple-600">{selectedAttraction.hours}</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="w-5 h-5 text-orange-600" />
                    <p className="text-sm text-gray-600">Best Time</p>
                  </div>
                  <p className="text-sm font-semibold text-orange-600">{selectedAttraction.bestTime}</p>
                </div>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-semibold text-[#1a1a1a] mb-3">💡 Visitor Tips</h4>
                <ul className="space-y-2">
                  {selectedAttraction.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#0066cc] font-bold mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  onClick={() => toggleFavorite(selectedAttraction.id)}
                  className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                    isFavorite(selectedAttraction.id)
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart className={`w-5 h-5 ${isFavorite(selectedAttraction.id) ? 'fill-current' : ''}`} />
                  {isFavorite(selectedAttraction.id) ? 'Favorited' : 'Add to Favorites'}
                </motion.button>
                <motion.button
                  className="flex-1 py-3 bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
