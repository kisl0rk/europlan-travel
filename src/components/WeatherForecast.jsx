import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react'

export default function WeatherForecast({ destination, startDate, endDate }) {
  const [unit, setUnit] = useState('celsius')

  const weatherData = {
    'France': [
      { date: '2024-09-14', day: 'Mon', high: 22, low: 15, condition: 'Partly Cloudy', icon: 'cloud', humidity: 65, windSpeed: 12, visibility: 10 },
      { date: '2024-09-15', day: 'Tue', high: 20, low: 14, condition: 'Rainy', icon: 'rain', humidity: 80, windSpeed: 18, visibility: 8 },
      { date: '2024-09-16', day: 'Wed', high: 19, low: 13, condition: 'Cloudy', icon: 'cloud', humidity: 72, windSpeed: 15, visibility: 9 },
      { date: '2024-09-17', day: 'Thu', high: 23, low: 16, condition: 'Sunny', icon: 'sun', humidity: 55, windSpeed: 8, visibility: 10 },
      { date: '2024-09-18', day: 'Fri', high: 24, low: 17, condition: 'Sunny', icon: 'sun', humidity: 50, windSpeed: 7, visibility: 10 },
      { date: '2024-09-19', day: 'Sat', high: 21, low: 15, condition: 'Partly Cloudy', icon: 'cloud', humidity: 60, windSpeed: 10, visibility: 10 },
      { date: '2024-09-20', day: 'Sun', high: 20, low: 14, condition: 'Rainy', icon: 'rain', humidity: 85, windSpeed: 20, visibility: 7 },
    ],
    'Italy': [
      { date: '2024-09-14', day: 'Mon', high: 26, low: 19, condition: 'Sunny', icon: 'sun', humidity: 55, windSpeed: 10, visibility: 10 },
      { date: '2024-09-15', day: 'Tue', high: 27, low: 20, condition: 'Sunny', icon: 'sun', humidity: 50, windSpeed: 9, visibility: 10 },
      { date: '2024-09-16', day: 'Wed', high: 25, low: 18, condition: 'Partly Cloudy', icon: 'cloud', humidity: 65, windSpeed: 12, visibility: 10 },
      { date: '2024-09-17', day: 'Thu', high: 23, low: 17, condition: 'Cloudy', icon: 'cloud', humidity: 70, windSpeed: 15, visibility: 9 },
      { date: '2024-09-18', day: 'Fri', high: 24, low: 18, condition: 'Sunny', icon: 'sun', humidity: 55, windSpeed: 8, visibility: 10 },
      { date: '2024-09-19', day: 'Sat', high: 26, low: 19, condition: 'Sunny', icon: 'sun', humidity: 50, windSpeed: 7, visibility: 10 },
      { date: '2024-09-20', day: 'Sun', high: 25, low: 18, condition: 'Partly Cloudy', icon: 'cloud', humidity: 60, windSpeed: 11, visibility: 10 },
    ],
    'Spain': [
      { date: '2024-09-14', day: 'Mon', high: 28, low: 21, condition: 'Sunny', icon: 'sun', humidity: 45, windSpeed: 8, visibility: 10 },
      { date: '2024-09-15', day: 'Tue', high: 29, low: 22, condition: 'Sunny', icon: 'sun', humidity: 42, windSpeed: 7, visibility: 10 },
      { date: '2024-09-16', day: 'Wed', high: 27, low: 20, condition: 'Partly Cloudy', icon: 'cloud', humidity: 55, windSpeed: 10, visibility: 10 },
      { date: '2024-09-17', day: 'Thu', high: 25, low: 19, condition: 'Cloudy', icon: 'cloud', humidity: 65, windSpeed: 13, visibility: 9 },
      { date: '2024-09-18', day: 'Fri', high: 26, low: 20, condition: 'Sunny', icon: 'sun', humidity: 50, windSpeed: 9, visibility: 10 },
      { date: '2024-09-19', day: 'Sat', high: 28, low: 21, condition: 'Sunny', icon: 'sun', humidity: 45, windSpeed: 6, visibility: 10 },
      { date: '2024-09-20', day: 'Sun', high: 27, low: 20, condition: 'Sunny', icon: 'sun', humidity: 48, windSpeed: 8, visibility: 10 },
    ],
  }

  const data = weatherData[destination] || []

  const convertTemp = (celsius) => {
    return unit === 'fahrenheit' ? Math.round((celsius * 9/5) + 32) : celsius
  }

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sun':
        return <Sun className="w-8 h-8 text-yellow-500" />
      case 'cloud':
        return <Cloud className="w-8 h-8 text-gray-500" />
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Sunny':
        return 'bg-yellow-50 border-yellow-200'
      case 'Rainy':
        return 'bg-blue-50 border-blue-200'
      case 'Cloudy':
      case 'Partly Cloudy':
        return 'bg-gray-50 border-gray-200'
      default:
        return 'bg-blue-50 border-blue-200'
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

  const itemVariants = {
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
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2">
              Weather Forecast
            </h2>
            <p className="text-gray-600">
              {destination} • {new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setUnit('celsius')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                unit === 'celsius'
                  ? 'bg-white text-[#0066cc] shadow-sm'
                  : 'text-gray-600 hover:text-[#0066cc]'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('fahrenheit')}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                unit === 'fahrenheit'
                  ? 'bg-white text-[#0066cc] shadow-sm'
                  : 'text-gray-600 hover:text-[#0066cc]'
              }`}
            >
              °F
            </button>
          </div>
        </div>

        {/* Weather Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3"
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
          {data.map((day, idx) => (
            <motion.div
              key={idx}
              className={`rounded-lg border-2 p-4 text-center ${getConditionColor(day.condition)} hover:shadow-md transition-shadow`}
              variants={itemVariants}
            >
              <p className="text-sm font-semibold text-gray-700 mb-2">{day.day}</p>
              <p className="text-xs text-gray-600 mb-3">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              
              <div className="flex justify-center mb-3">
                {getWeatherIcon(day.icon)}
              </div>

              <p className="text-xs text-gray-600 mb-3 font-medium">{day.condition}</p>

              <div className="space-y-2">
                <div>
                  <p className="text-2xl font-bold text-[#0066cc]">
                    {convertTemp(day.high)}°
                  </p>
                  <p className="text-xs text-gray-600">
                    {convertTemp(day.low)}°
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Weather for First Day */}
        {data.length > 0 && (
          <motion.div
            className="mt-8 pt-8 border-t border-gray-200"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">
              Detailed Forecast - {data[0].day}, {new Date(data[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <p className="text-sm text-gray-600">Humidity</p>
                </div>
                <p className="text-2xl font-bold text-[#0066cc]">{data[0].humidity}%</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-600">Wind Speed</p>
                </div>
                <p className="text-2xl font-bold text-green-600">{data[0].windSpeed} km/h</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <p className="text-sm text-gray-600">Visibility</p>
                </div>
                <p className="text-2xl font-bold text-purple-600">{data[0].visibility} km</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-orange-600" />
                  <p className="text-sm text-gray-600">UV Index</p>
                </div>
                <p className="text-2xl font-bold text-orange-600">Moderate</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Packing Tips */}
        <motion.div
          className="mt-8 pt-8 border-t border-gray-200 bg-blue-50 rounded-lg p-6"
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold text-[#1a1a1a] mb-4">Packing Tips</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Bring layers - temperature varies throughout the day</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Pack a light rain jacket for potential showers</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Comfortable walking shoes recommended for all conditions</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Sunscreen and sunglasses for sunny days</span>
            </li>
          </ul>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-600 text-center">
          Weather forecasts are subject to change. This data is based on historical averages and current predictions.
        </p>
      </div>
    </motion.div>
  )
}
