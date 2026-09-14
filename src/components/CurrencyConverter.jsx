import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, ArrowRightLeft, Globe } from 'lucide-react'

export default function CurrencyConverter({ destination }) {
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [convertedAmount, setConvertedAmount] = useState('0')
  const [exchangeRate, setExchangeRate] = useState(0.92)

  const currencyData = {
    'France': 'EUR',
    'Italy': 'EUR',
    'Spain': 'EUR',
  }

  const exchangeRates = {
    'USD': { 'EUR': 0.92, 'GBP': 0.79, 'CHF': 0.88, 'CAD': 1.36, 'AUD': 1.51, 'JPY': 149.5 },
    'EUR': { 'USD': 1.09, 'GBP': 0.86, 'CHF': 0.96, 'CAD': 1.48, 'AUD': 1.65, 'JPY': 163.0 },
    'GBP': { 'USD': 1.27, 'EUR': 1.16, 'CHF': 1.11, 'CAD': 1.72, 'AUD': 1.92, 'JPY': 189.5 },
    'CHF': { 'USD': 1.14, 'EUR': 1.04, 'GBP': 0.90, 'CAD': 1.55, 'AUD': 1.72, 'JPY': 170.0 },
  }

  const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CHF': 'CHF',
    'CAD': 'C$',
    'AUD': 'A$',
    'JPY': '¥',
  }

  useEffect(() => {
    const destinationCurrency = currencyData[destination] || 'EUR'
    setToCurrency(destinationCurrency)
  }, [destination])

  useEffect(() => {
    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1
    setExchangeRate(rate)
    const converted = (parseFloat(amount) * rate).toFixed(2)
    setConvertedAmount(converted)
  }, [amount, fromCurrency, toCurrency])

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const commonCurrencies = ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY']

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
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a1a]">Currency Converter</h2>
            <p className="text-sm text-gray-600">Real-time exchange rates for your trip</p>
          </div>
        </div>

        {/* Converter Section */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 space-y-4">
          {/* From Currency */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              From
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors"
              />
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors font-semibold"
              >
                {commonCurrencies.map(curr => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {currencySymbols[fromCurrency]} {parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={handleSwap}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border-2 border-gray-200"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRightLeft className="w-5 h-5 text-[#0066cc]" />
            </motion.button>
          </div>

          {/* To Currency */}
          <div>
            <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
              To
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={convertedAmount}
                readOnly
                className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-[#0066cc] font-semibold"
              />
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors font-semibold"
              >
                {commonCurrencies.map(curr => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {currencySymbols[toCurrency]} {parseFloat(convertedAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Exchange Rate</p>
              <p className="font-semibold text-[#0066cc]">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-600">
            Updated: Today
          </p>
        </div>

        {/* Quick Conversions */}
        <div>
          <label className="block text-sm font-semibold text-[#1a1a1a] mb-3">
            Quick Conversions
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[50, 100, 200, 500, 1000, 5000].map(value => {
              const converted = (value * exchangeRate).toFixed(2)
              return (
                <motion.button
                  key={value}
                  onClick={() => setAmount(value.toString())}
                  className={`p-3 rounded-lg border-2 transition-colors text-center ${
                    parseFloat(amount) === value
                      ? 'bg-[#0066cc] border-[#0066cc] text-white'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-[#0066cc]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <p className="font-semibold text-sm">{currencySymbols[fromCurrency]}{value}</p>
                  <p className="text-xs opacity-75">= {currencySymbols[toCurrency]}{converted}</p>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Destination Currency Info */}
        <motion.div
          className="p-4 bg-green-50 border-l-4 border-green-500 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start gap-2">
            <Globe className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 text-sm mb-1">
                {destination} Currency
              </p>
              <p className="text-sm text-green-800">
                The primary currency in {destination} is {currencyData[destination] || 'EUR'}. 
                Most establishments accept card payments, and ATMs are widely available in cities.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <div className="p-4 bg-gray-50 rounded-lg space-y-2">
          <p className="text-sm font-semibold text-[#1a1a1a] mb-2">💡 Money Tips</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Use ATMs for the best exchange rates</li>
            <li>• Notify your bank before traveling</li>
            <li>• Carry a mix of cash and cards</li>
            <li>• Avoid currency exchange at airports</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-600 text-center">
          Exchange rates are for reference only and may differ from actual rates offered by banks or currency exchange services.
        </p>
      </div>
    </motion.div>
  )
}
