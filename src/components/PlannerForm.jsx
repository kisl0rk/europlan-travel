import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, AlertCircle } from 'lucide-react'

export default function PlannerForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '1',
    budget: 'medium',
    interests: [],
  })

  const [errors, setErrors] = useState({})

  const interests = [
    { id: 'culture', label: 'Culture & History' },
    { id: 'nature', label: 'Nature & Hiking' },
    { id: 'food', label: 'Food & Wine' },
    { id: 'adventure', label: 'Adventure Sports' },
    { id: 'nightlife', label: 'Nightlife' },
    { id: 'relax', label: 'Relaxation' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleInterestChange = (interestId) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required'
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    if (formData.interests.length === 0) {
      newErrors.interests = 'Select at least one interest'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
            <MapPin className="inline-block w-4 h-4 mr-2" />
            Where are you going?
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="e.g., Paris, Barcelona, Rome..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors"
          />
          {errors.destination && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.destination}
            </p>
          )}
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              <Calendar className="inline-block w-4 h-4 mr-2" />
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.endDate}
              </p>
            )}
          </div>
        </div>

        {/* Travelers & Budget */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              <Users className="inline-block w-4 h-4 mr-2" />
              Number of Travelers
            </label>
            <select
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              Budget
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors"
            >
              <option value="budget">Budget</option>
              <option value="medium">Medium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1a1a] mb-3">
            What interests you?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interests.map(interest => (
              <label key={interest.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest.id)}
                  onChange={() => handleInterestChange(interest.id)}
                  className="w-4 h-4 text-[#0066cc] rounded border-gray-300 focus:ring-2 focus:ring-[#0066cc]"
                />
                <span className="text-sm text-gray-700">{interest.label}</span>
              </label>
            ))}
          </div>
          {errors.interests && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.interests}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full btn-primary text-lg"
          whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(0, 102, 204, 0.3)' }}
          whileTap={{ scale: 0.98 }}
        >
          Create My Itinerary
        </motion.button>
      </form>
    </motion.div>
  )
}
