import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import PlannerForm from './components/PlannerForm'
import CountriesSection from './components/CountriesSection'
import TripResult from './components/TripResult'
import Footer from './components/Footer'
import { useTravelStore } from './store/travelStore'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const { tripData, resetTrip } = useTravelStore()

  const handleStartPlanning = () => {
    setCurrentPage('planner')
  }

  const handleViewCountries = () => {
    setCurrentPage('countries')
  }

  const handleTripCreated = () => {
    setCurrentPage('result')
  }

  const handleStartOver = () => {
    resetTrip()
    setCurrentPage('home')
  }

  const handleBackHome = () => {
    setCurrentPage('home')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentPage}
        onStartPlanning={handleStartPlanning}
        onViewCountries={handleViewCountries}
        onHome={handleBackHome}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero onStartPlanning={handleStartPlanning} />
            <Footer />
          </motion.div>
        )}

        {currentPage === 'planner' && (
          <motion.div
            key="planner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PlannerForm 
              onTripCreated={handleTripCreated}
              onBack={handleBackHome}
            />
            <Footer />
          </motion.div>
        )}

        {currentPage === 'countries' && (
          <motion.div
            key="countries"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CountriesSection onBack={handleBackHome} />
            <Footer />
          </motion.div>
        )}

        {currentPage === 'result' && tripData && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TripResult 
              onStartOver={handleStartOver}
              onBack={handleBackHome}
            />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
