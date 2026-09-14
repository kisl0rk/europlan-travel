import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info, CheckCircle, X, MapPin, TrendingUp } from 'lucide-react'

export default function SafetyAlert({ destination }) {
  const [dismissed, setDismissed] = useState(false)

  const safetyData = {
    'France': {
      level: 'low',
      rating: 4.5,
      alerts: [
        {
          type: 'theft',
          severity: 'medium',
          title: 'Petty Theft',
          description: 'Be aware of pickpockets in major cities, especially on public transport.',
        },
        {
          type: 'transport',
          severity: 'low',
          title: 'Public Transport Safe',
          description: 'Paris public transport is generally safe but avoid late-night travel alone.',
        },
      ],
      tips: [
        'Keep valuables secure and avoid displaying expensive items',
        'Stay aware of your surroundings in crowded areas',
        'Use official taxis or ride-sharing apps',
        'Keep copies of important documents separate from originals',
        'Register with your embassy before traveling',
      ],
      lastUpdated: '2024-09-10',
    },
    'Italy': {
      level: 'low',
      rating: 4.3,
      alerts: [
        {
          type: 'theft',
          severity: 'medium',
          title: 'Tourist Scams',
          description: 'Watch out for common tourist scams in Rome and Venice, especially at attractions.',
        },
        {
          type: 'transport',
          severity: 'low',
          title: 'Safe Travel',
          description: 'Italy is generally safe for tourists with standard precautions.',
        },
      ],
      tips: [
        'Avoid walking alone late at night in unfamiliar areas',
        'Be cautious with street vendors and unofficial tours',
        'Use hotel safes for valuables',
        'Keep emergency numbers accessible',
        'Travel insurance is recommended',
      ],
      lastUpdated: '2024-09-08',
    },
    'Spain': {
      level: 'low',
      rating: 4.4,
      alerts: [
        {
          type: 'theft',
          severity: 'medium',
          title: 'Urban Theft',
          description: 'Barcelona and Madrid experience occasional pickpocketing in tourist areas.',
        },
        {
          type: 'natural',
          severity: 'low',
          title: 'Weather Safe',
          description: 'Spain has stable weather; minor risk of occasional storms in summer.',
        },
      ],
      tips: [
        'Avoid displaying expensive jewelry or cameras',
        'Use ATMs in secure locations',
        'Travel in groups at night',
        'Keep bags in front of you in crowds',
        'Carry ID at all times',
      ],
      lastUpdated: '2024-09-12',
    },
  }

  const data = safetyData[destination] || {
    level: 'unknown',
    rating: 0,
    alerts: [
      {
        type: 'info',
        severity: 'info',
        title: 'Information Limited',
        description: 'Safety data not available. Check official travel advisories.',
      },
    ],
    tips: ['Consult your government travel advisory for current information'],
    lastUpdated: new Date().toISOString().split('T')[0],
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', badge: 'bg-red-100 text-red-800' }
      case 'medium':
        return { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-800' }
      case 'low':
        return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-800' }
      case 'info':
        return { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-600', badge: 'bg-gray-100 text-gray-800' }
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-600', badge: 'bg-gray-100 text-gray-800' }
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-5 h-5" />
      case 'medium':
        return <AlertCircle className="w-5 h-5" />
      case 'low':
        return <Info className="w-5 h-5" />
      case 'info':
        return <Info className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getLevelBadge = (level) => {
    switch (level) {
      case 'low':
        return { text: 'Low Risk', color: 'bg-green-100 text-green-800', icon: CheckCircle }
      case 'medium':
        return { text: 'Medium Risk', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle }
      case 'high':
        return { text: 'High Risk', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
      default:
        return { text: 'Unknown', color: 'bg-gray-100 text-gray-800', icon: Info }
    }
  }

  const levelInfo = getLevelBadge(data.level)
  const LevelIcon = levelInfo.icon

  if (dismissed) {
    return (
      <motion.button
        onClick={() => setDismissed(false)}
        className="text-sm text-[#0066cc] hover:underline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Show safety information
      </motion.button>
    )
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-[#1a1a1a]">
                  Safety Overview: {destination}
                </h2>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${levelInfo.color}`}>
                  <LevelIcon className="w-4 h-4" />
                  <span className="text-sm font-semibold">{levelInfo.text}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-[#0066cc]" />
                  <span className="text-sm font-semibold text-[#0066cc]">
                    Safety Rating: {data.rating}/5
                  </span>
                </div>
                <span className="text-xs text-gray-600">
                  Updated: {new Date(data.lastUpdated).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <motion.button
            onClick={() => setDismissed(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Safety Alerts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">Safety Alerts</h3>
        {data.alerts.map((alert, idx) => {
          const colors = getSeverityColor(alert.severity)
          return (
            <motion.div
              key={idx}
              className={`rounded-lg border-2 p-4 ${colors.bg} ${colors.border}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <div className="flex items-start gap-3">
                <div className={`${colors.icon} mt-1`}>
                  {getSeverityIcon(alert.severity)}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-[#1a1a1a]">{alert.title}</h4>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${colors.badge}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{alert.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Safety Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Safety Tips</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {data.tips.map((tip, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-3 p-3 bg-white rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
            >
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{tip}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Additional Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="#"
            className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-[#0066cc] transition-colors"
          >
            <p className="font-semibold text-[#0066cc] mb-1">Government Travel Advisory</p>
            <p className="text-sm text-gray-600">Check your country's official travel advisories</p>
          </a>
          <a
            href="#"
            className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-[#0066cc] transition-colors"
          >
            <p className="font-semibold text-[#0066cc] mb-1">Emergency Contacts</p>
            <p className="text-sm text-gray-600">Local emergency numbers and embassy contacts</p>
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-blue-50 border-l-4 border-[#0066cc] rounded">
        <p className="text-sm text-blue-900">
          <strong>Disclaimer:</strong> This information is based on current travel advisories and general knowledge. Situations can change rapidly. Always check official government travel advisories and local news before traveling.
        </p>
      </div>
    </motion.div>
  )
}
