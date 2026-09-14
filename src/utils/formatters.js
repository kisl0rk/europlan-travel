export const formatCurrency = (amount, currency = 'EUR') => {
  if (currency === 'EUR') return `€${amount.toFixed(0)}`
  if (currency === 'RUB') return `₽${amount.toLocaleString('ru-RU')}`
  return `${amount.toFixed(2)} ${currency}`
}

export const formatDays = (days) => {
  if (days === 1) return '1 day'
  return `${days} days`
}

export const getVisaStatusColor = (status) => {
  if (status === 'green') return 'bg-green-100 text-green-800 border-green-300'
  if (status === 'orange') return 'bg-orange-100 text-orange-800 border-orange-300'
  return 'bg-red-100 text-red-800 border-red-300'
}

export const getVisaStatusEmoji = (status) => {
  if (status === 'green') return '🟢'
  if (status === 'orange') return '🟡'
  return '🔴'
}
