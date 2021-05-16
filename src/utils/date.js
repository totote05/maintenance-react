const fmt = (v) => v <10 ? `0${v}` : v

export function formatDate (date) {
  const yyyy = date.getFullYear()
  const MM = date.getMonth() + 1
  const dd = date.getDate()

  return `${yyyy}-${fmt(MM)}-${fmt(dd)}`
}

export function formatTime(date) {
  const HH = date.getHours()
  const mm = date.getMinutes()

  return `${fmt(HH)}:${fmt(mm)}`
}

export function getDateTimeValues(date) {
  const dateTime = {
    date: null,
    time: null,
  }
  
  if (date) {
    const parts = date.split(' ')
    dateTime.date = parts.shift()
  
    if (parts.length > 0) {
      dateTime.time = parts.shift().slice(0,5)
    }
  }

  return dateTime
}