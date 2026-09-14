import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, AlertCircle, CheckCircle, Clock, Globe, Download } from 'lucide-react'

export default function VisaRequirements({ destination, nationality }) {
  const [activeTab, setActiveTab] = useState('overview')

  const visaData = {
    'France': {
      overview: 'EU/EEA citizens do not need a visa. Non-EU citizens may qualify for a 90-day Schengen visa.',
      requirements: [
        'Valid passport (minimum 6 months validity)',
        'Travel insurance',
        'Proof of accommodation',
        'Proof of financial means',
        'Return ticket',
      ],
      processingTime: '10-15 business days',
      validity: '90 days within 180 days',
      status: 'approved',
    },
    'Italy': {
      overview: 'EU/EEA citizens have unrestricted access. Non-EU citizens need a Schengen visa.',
      requirements: [
        'Passport valid for 6+ months',
        'Completed visa application form',
        'Travel insurance coverage',
        'Proof of accommodation',
        'Bank statements showing financial ability',
      ],
      processingTime: '15 business days',
      validity: '90 days within 180 days',
      status: 'approved',
    },
    'Spain': {
      overview: 'EU/EEA nationals enter freely. Schengen visa required for other nationalities.',
      requirements: [
        'Valid passport',
        'Schengen visa application',
        'Health insurance',
        'Accommodation proof',
        'Flight reservations',
      ],
      processingTime: '10-15 business days',
      validity: '90 days within 180 days',
      status: 'approved',
    },
  }

  const data = visaData[destination] || {
    overview: 'Visa information not available. Please check official government websites.',
    requirements: ['Contact your local embassy for specific requirements'],
    processingTime: 'Varies',
    validity: 'Varies',
    status: 'pending',
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 border-green-200'
      case 'pending':
        return 'bg-yellow-50 border-yellow-200'
      case 'denied':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'denied':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Globe className="w-5 h-5 text-blue-600" />
    }
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`rounded-xl border-2 p-8 space-y-6 ${getStatusColor(data.status)}`}>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-lg">
              <FileText className="w-8 h-8 text-[#0066cc]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-2">
                Visa Requirements for {destination}
              </h2>
              <p className="text-gray-700">{nationality} Nationals</p>
            </div>
          </div>
          <motion.button
            className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-6 h-6 text-[#0066cc]" />
          </motion.button>
        </div>

        {/* Status Overview */}
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg">
          {getStatusIcon(data.status)}
          <div>
            <p className="font-semibold text-[#1a1a1a] capitalize">{data.status} Status</p>
            <p className="text-sm text-gray-600">{data.overview}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-300">
          {['overview', 'requirements', 'timeline'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-[#0066cc] text-[#0066cc]'
                  : 'border-transparent text-gray-600 hover:text-[#0066cc]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <p className="text-gray-700 leading-relaxed">{data.overview}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Processing Time</p>
                  <p className="text-lg font-semibold text-[#0066cc]">{data.processingTime}</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Visa Validity</p>
                  <p className="text-lg font-semibold text-[#0066cc]">{data.validity}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <motion.div className="space-y-3">
              {data.requirements.map((req, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-[#1a1a1a] mb-4">Application Timeline</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Prepare Documents', time: '1-2 weeks' },
                    { step: 2, title: 'Submit Application', time: 'Same day' },
                    { step: 3, title: 'Processing', time: data.processingTime },
                    { step: 4, title: 'Receive Decision', time: '1-2 days' },
                    { step: 5, title: 'Collect Passport', time: 'Same day' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0066cc] text-white text-sm font-semibold">
                          {item.step}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-[#1a1a1a]">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer Note */}
        <div className="p-4 bg-blue-100 border-l-4 border-[#0066cc] rounded">
          <p className="text-sm text-blue-900">
            <strong>Note:</strong> This information is for reference only. Please verify with your local embassy or consulate for the most current requirements.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
