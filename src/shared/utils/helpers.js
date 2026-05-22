export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)

export const generateId = () => Math.random().toString(36).substr(2, 9)

export const getDiscount = (original, current) =>
  Math.round(((original - current) / original) * 100)

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
