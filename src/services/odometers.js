import ValidationError from "../errors/ValidationError"
import { sortByDate, SORT_DESC } from "../utils/date"

const apiUrl = process.env.REACT_APP_API_URL

const endpoint = `${apiUrl}/odometer`

export async function getOdometers() {
  const response = await fetch(endpoint)

  if (response.ok) {
    const odometers = await response.json()

    odometers.sort((a, b) => sortByDate(a.date, b.date, SORT_DESC))

    return odometers
  } else {
    throw response
  }
}

export async function getLastRegistered() {
  const odometers = await getOdometers()
  return odometers.shift() ?? null
}

async function getPrevRegisteredByDate (date) {
  const odometers = await getOdometers()

  for (let i = 0; i < odometers.length; i++) {
    const registered = new Date(odometers[i].date)
    if (date.getTime() > registered.getTime()) {
      return odometers[i]
    }
  }

  return null
}

export async function saveOdometer (data) {
  const prev = await getPrevRegisteredByDate(new Date(data.date))

  if (prev?.value > data.value) {
    throw new ValidationError('El kilometraje es menor al registrado previamente')
  }

  const method = data.id ? 'PUT' : 'POST'
  const endpointUrl = data.id ? `${endpoint}/${data.id}` : endpoint

  const response = await fetch(endpointUrl, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    return await response.json()
  } else {
    throw response
  }
}

export async function deleteOdometer (id) {
  const response = await fetch(`${endpoint}/${id}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    return await response.json()
  } else {
    throw response
  }
}