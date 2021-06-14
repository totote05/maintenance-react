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

export function formatDateTime(date) {
  const yyyy = date.getFullYear()
  const MM = date.getMonth() + 1
  const dd = date.getDate()

  return `${dd}/${fmt(MM)}/${fmt(yyyy)} ${formatTime(date)}`
}

export const SORT_ASC = 'asc'
export const SORT_DESC = 'desc'
export function sortByDate (a, b, sort = SORT_ASC) {
  const dateA = sort === SORT_ASC ? new Date(a) : new Date(b)
  const dateB = sort === SORT_ASC ? new Date(b) : new Date(a)

  if (dateA.getTime() < dateB.getTime()) {
    return -1
  } else if (dateA.getTime() > dateB.getTime()) {
    return 1
  } else {
    return 0
  }
}