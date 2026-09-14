import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Circle, Trash2, Plus, Download, Share2, BarChart3 } from 'lucide-react'

export default function PackingChecklist() {
  const [items, setItems] = useState([
    // Clothing
    { id: 1, category: 'Clothing', item: 'Casual T-shirts', packed: false, quantity: 3 },
    { id: 2, category: 'Clothing', item: 'Jeans/Casual pants', packed: false, quantity: 2 },
    { id: 3, category: 'Clothing', item: 'Light sweater/cardigan', packed: false, quantity: 1 },
    { id: 4, category: 'Clothing', item: 'Comfortable walking shoes', packed: false, quantity: 1 },
    { id: 5, category: 'Clothing', item: 'Socks and undergarments', packed: false, quantity: 7 },
    { id: 6, category: 'Clothing', item: 'Light rain jacket', packed: false, quantity: 1 },
    { id: 7, category: 'Clothing', item: 'Dress/nicer outfit', packed: false, quantity: 1 },
    
    // Toiletries
    { id: 8, category: 'Toiletries', item: 'Toothbrush and toothpaste', packed: false, quantity: 1 },
    { id: 9, category: 'Toiletries', item: 'Shampoo/conditioner', packed: false, quantity: 1 },
    { id: 10, category: 'Toiletries', item: 'Deodorant', packed: false, quantity: 1 },
    { id: 11, category: 'Toiletries', item: 'Sunscreen', packed: false, quantity: 1 },
    { id: 12, category: 'Toiletries', item: 'Medications/vitamins', packed: false, quantity: 1 },
    { id: 13, category: 'Toiletries', item: 'Skincare products', packed: false, quantity: 1 },
    
    // Documents & Essentials
    { id: 14, category: 'Documents', item: 'Passport', packed: false, quantity: 1 },
    { id: 15, category: 'Documents', item: 'Travel insurance documents', packed: false, quantity: 1 },
    { id: 16, category: 'Documents', item: 'Flight tickets/confirmations', packed: false, quantity: 1 },
    { id: 17, category: 'Documents', item: 'Hotel reservations', packed: false, quantity: 1 },
    { id: 18, category: 'Documents', item: 'Credit/debit cards', packed: false, quantity: 1 },
    { id: 19, category: 'Documents', item: 'Cash in local currency', packed: false, quantity: 1 },
    
    // Electronics
    { id: 20, category: 'Electronics', item: 'Phone and charger', packed: false, quantity: 1 },
    { id: 21, category: 'Electronics', item: 'Power bank', packed: false, quantity: 1 },
    { id: 22, category: 'Electronics', item: 'Universal adapter', packed: false, quantity: 1 },
    { id: 23, category: 'Electronics', item: 'Camera', packed: false, quantity: 1 },
    { id: 24, category: 'Electronics', item: 'Headphones', packed: false, quantity: 1 },
    
    // Accessories
    { id: 25, category: 'Accessories', item: 'Backpack/day bag', packed: false, quantity: 1 },
    { id: 26, category: 'Accessories', item: 'Sunglasses', packed: false, quantity: 1 },
    { id: 27, category: 'Accessories', item: 'Hat/cap', packed: false, quantity: 1 },
    { id: 28, category: 'Accessories', item: 'Travel pillow', packed: false, quantity: 1 },
  ])

  const [newItem, setNewItem] = useState('')
  const [newCategory, setNewCategory] = useState('Clothing')

  const categories = [...new Set(items.map(item => item.category))]
  
  const togglePacked = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, packed: !item.packed } : item
    ))
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const addItem = () => {
    if (newItem.trim()) {
      setItems([
        ...items,
        {
          id: Math.max(...items.map(i => i.id), 0) + 1,
          category: newCategory,
          item: newItem,
          packed: false,
          quantity: 1,
        },
      ])
      setNewItem('')
    }
  }

  const packedCount = items.filter(item => item.packed).length
  const packedPercentage = Math.round((packedCount / items.length) * 100)

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
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">Packing Checklist</h2>
              <p className="text-gray-600">Never forget anything important again</p>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5 text-[#0066cc]" />
            </motion.button>
            <motion.button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5 text-[#0066cc]" />
            </motion.button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#0066cc]" />
              <span className="font-semibold text-[#1a1a1a]">Progress</span>
            </div>
            <span className="text-sm font-bold text-[#0066cc]">
              {packedCount} of {items.length} items packed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#0066cc] to-[#0052a3]"
              initial={{ width: 0 }}
              animate={{ width: `${packedPercentage}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <p className="text-sm text-gray-600 text-right">
            {packedPercentage}% complete
          </p>
        </div>

        {/* Add New Item */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-[#1a1a1a]">Add New Item</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
              placeholder="What do you need to pack?"
              className="flex-grow px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <motion.button
              onClick={addItem}
              className="px-4 py-2 bg-[#0066cc] text-white rounded-lg font-semibold hover:bg-[#0052a3] transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              Add
            </motion.button>
          </div>
        </div>

        {/* Items by Category */}
        <div className="space-y-6">
          {categories.map(category => {
            const categoryItems = items.filter(item => item.category === category)
            const categoryPacked = categoryItems.filter(item => item.packed).length
            
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-gray-100">
                  <h3 className="text-lg font-bold text-[#1a1a1a]">{category}</h3>
                  <span className="text-sm font-semibold text-[#0066cc]">
                    {categoryPacked}/{categoryItems.length}
                  </span>
                </div>
                
                <AnimatePresence mode="popLayout">
                  <motion.div
                    className="grid md:grid-cols-2 gap-3"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                        },
                      },
                    }}
                  >
                    {categoryItems.map(item => (
                      <motion.div
                        key={item.id}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          item.packed
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200 hover:border-[#0066cc]'
                        }`}
                        variants={itemVariants}
                        onClick={() => togglePacked(item.id)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-grow">
                            {item.packed ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                            <div className="flex-grow">
                              <p className={`font-semibold ${item.packed ? 'line-through text-gray-600' : 'text-[#1a1a1a]'}`}>
                                {item.item}
                              </p>
                              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteItem(item.id)
                            }}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Tips */}
        <motion.div
          className="p-4 bg-blue-50 border-l-4 border-[#0066cc] rounded space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-semibold text-[#0066cc]">💡 Packing Tips</p>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>• Roll clothes instead of folding to save space</li>
            <li>• Pack heavier items at the bottom of your luggage</li>
            <li>• Use packing cubes to organize by category</li>
            <li>• Wear your bulkiest item on the plane</li>
            <li>• Keep important documents in your carry-on</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}
