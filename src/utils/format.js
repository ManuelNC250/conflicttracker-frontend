const months = {
  ca: ['gen', 'febr', 'marc', 'abr', 'maig', 'juny', 'jul', 'ag', 'set', 'oct', 'nov', 'des'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
}

export const formatDate = (value, locale = 'ca') => {
  if (!value) return '-'
  try {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    const lang = locale === 'ca' ? 'ca' : 'en'
    const day = String(date.getDate()).padStart(2, '0')
    const month = months[lang][date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month} ${year}`
  } catch (error) {
    return value
  }
}

export const normalizeText = (value) => (value || '').toString().toLowerCase()