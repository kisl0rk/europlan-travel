import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PieChart, BarChart3, TrendingUp, DollarSign, Plus, Trash2, Edit2 } from 'lucide-react'

export default function TravelBudget({ destination }) {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Accommodation', amount: 800, currency: 'USD', date: '2024-09-15' },
    { id: 2, category: 'Flights', amount: 600, currency: 'USD', date: '2024-09-15' },
    { id: 3, category: 'Food & Dining', amount: 300, currency: 'USD', date: '2024-09-15' },
    { id: 4, category: 'Activities', amount: 250, currency: 'USD', date: '2024-09-15' },
    { id: 5, category: 'Transportation', amount: 150, currency: 'USD', date: '2024-09-15' },
  ])

  const [budget, setBudget] = useState(3000)
  const [newExpense, setNewExpense] = useState({
    category: 'Food & Dining',
    amount: '',
    currency: 'USD',
  })
  const [editingId, setEditingId] = useState(null)

  const categories = ['Accommodation', 'Flights', 'Food & Dining', 'Activities', 'Transportation', 'Shopping', 'Entertainment', 'Other']
  const currencies = ['USD', 'EUR', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY']

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const remaining = budget - totalSpent
  const percentageSpent = Math.round((totalSpent / budget) * 100)

  const categoryTotals = categories.map(cat => ({
    category: cat,
    amount: expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0),
  })).filter(item => item.amount > 0)

  const topCategory = categoryTotals.length > 0
    ? categoryTotals.reduce((max, item) => item.amount > max.amount ? item : max)
    : null

  const addExpense = () => {
    if (newExpense.amount && parseFloat(newExpense.amount) > 0) {
      if (editingId) {
        setExpenses(expenses.map(exp =>
          exp.id === editingId
            ? { ...exp, ...newExpense, amount: parseFloat(newExpense.amount) }
            : exp
        ))
        setEditingId(null)
      } else {
        setExpenses([
          ...expenses,
          {
            id: Math.max(...expenses.map(e => e.id), 0) + 1,
            ...newExpense,
            amount: parseFloat(newExpense.amount),
            date: new Date().toISOString().split('T')[0],
          },
        ])
      }
      setNewExpense({ category: 'Food & Dining', amount: '', currency: 'USD' })
    }
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const editExpense = (expense) => {
    setNewExpense(expense)
    setEditingId(expense.id)
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  const colors = ['#0066cc', '#00cc66', '#ff6600', '#cc0000', '#6600cc', '#00cccc', '#ffcc00']

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
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">Travel Budget Planner</h2>
              <p className="text-gray-600">Track your spending and manage your {destination} trip budget</p>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <motion.div
              className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
              variants={cardVariants}
            >
              <p className="text-sm text-gray-600 mb-1">Total Budget</p>
              <p className="text-2xl font-bold text-[#0066cc]">${budget.toLocaleString()}</p>
            </motion.div>
            <motion.div
              className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500"
              variants={cardVariants}
            >
              <p className="text-sm text-gray-600 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-orange-600">${totalSpent.toLocaleString()}</p>
            </motion.div>
            <motion.div
              className={`p-4 rounded-lg border-l-4 ${
                remaining >= 0
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500'
              }`}
              variants={cardVariants}
            >
              <p className="text-sm text-gray-600 mb-1">Remaining</p>
              <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${remaining.toLocaleString()}
              </p>
            </motion.div>
            <motion.div
              className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500"
              variants={cardVariants}
            >
              <p className="text-sm text-gray-600 mb-1">Spent %</p>
              <p className="text-2xl font-bold text-purple-600">{percentageSpent}%</p>
            </motion.div>
          </div>
        </div>

        {/* Progress Bar */}
        <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={cardVariants}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-[#1a1a1a]">Budget Progress</span>
            <span className="text-sm text-gray-600">
              {totalSpent.toLocaleString()} / {budget.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              className={`h-full ${remaining >= 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentageSpent, 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Add Expense Form */}
          <motion.div className="lg:col-span-1" variants={cardVariants}>
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <h3 className="text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {editingId ? 'Edit Expense' : 'Add Expense'}
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Category
                  </label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors text-sm"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                    Currency
                  </label>
                  <select
                    value={newExpense.currency}
                    onChange={(e) => setNewExpense({ ...newExpense, currency: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors text-sm"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <motion.button
                    onClick={addExpense}
                    className="flex-grow py-2 bg-gradient-to-r from-[#0066cc] to-[#0052a3] text-white font-semibold rounded-lg hover:shadow-lg transition-shadow text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {editingId ? 'Update' : 'Add'}
                  </motion.button>
                  {editingId && (
                    <motion.button
                      onClick={() => {
                        setEditingId(null)
                        setNewExpense({ category: 'Food & Dining', amount: '', currency: 'USD' })
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Budget Setter */}
              <div className="pt-4 border-t border-gray-200">
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                  Set Total Budget
                </label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0066cc] transition-colors text-sm"
                />
              </div>
            </div>
          </motion.div>

          {/* Category Breakdown & Top Expenses */}
          <motion.div className="lg:col-span-2 space-y-6" variants={cardVariants}>
            {/* Category Breakdown */}
            {categoryTotals.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Spending by Category
                </h3>
                <div className="space-y-3">
                  {categoryTotals.map((item, idx) => (
                    <div key={item.category}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-[#1a1a1a]">{item.category}</span>
                        <span className="text-sm font-bold text-[#0066cc]">
                          ${item.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full"
                          style={{ backgroundColor: colors[idx % colors.length] }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.amount / totalSpent) * 100}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Category */}
            {topCategory && (
              <motion.div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 border-l-4 border-[#0066cc]" variants={cardVariants}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Highest Spending Category</p>
                    <p className="text-2xl font-bold text-[#0066cc]">{topCategory.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="text-2xl font-bold text-purple-600">${topCategory.amount.toLocaleString()}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Expenses List */}
        <motion.div className="bg-white rounded-xl shadow-lg p-6" variants={cardVariants}>
          <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            All Expenses ({expenses.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-[#1a1a1a]">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-[#1a1a1a]">Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-[#1a1a1a]">Amount</th>
                  <th className="text-center py-3 px-4 font-semibold text-[#1a1a1a]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, idx) => (
                  <motion.tr
                    key={exp.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <td className="py-3 px-4 text-sm text-gray-700">{exp.date}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold text-[#0066cc]">{exp.category}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm font-bold text-[#1a1a1a]">
                        {exp.currency} ${exp.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          onClick={() => editExpense(exp)}
                          className="p-2 hover:bg-blue-100 rounded transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit2 className="w-4 h-4 text-[#0066cc]" />
                        </motion.button>
                        <motion.button
                          onClick={() => deleteExpense(exp.id)}
                          className="p-2 hover:bg-red-100 rounded transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Budget Tips */}
        <motion.div
          className="p-6 bg-green-50 border-l-4 border-green-500 rounded-xl space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-semibold text-green-900 flex items-center gap-2">
            💡 Budget Tips for {destination}
          </p>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Set a daily spending limit to stay on track</li>
            <li>• Keep receipts for all expenses</li>
            <li>• Book accommodations and flights in advance for better prices</li>
            <li>• Look for free attractions and walking tours</li>
            <li>• Eat at local markets and cafes for authentic, budget-friendly meals</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  )
}
