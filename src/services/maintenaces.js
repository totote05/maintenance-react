import { sortByDate, SORT_DESC } from "../utils/date"
import { getTypes } from "./types"

const apiUrl = process.env.REACT_APP_API_URL

const endpoint = `${apiUrl}/maintenance`

export async function getMaintenances () {
  const types = await getTypes()

  const response =  await fetch(endpoint)

  if (response.ok) {
    const latests = {}

    const data = await response.json()

    const maintenances = data.map(item => {
      item.last = false

      if (!latests[item.type]) {
        item.last = true
        latests[item.type] = item
      } else {
        const lastDate = new Date(latests[item.type].date)
        const currentDate = new Date(item.date)

        if (currentDate.getTime() > lastDate.getTime()) {
          latests[item.type].last = false
          item.last = true
          latests[item.type] = item
        }
      }

      item.type = types.find(t => t.id === item.type)

      return item
    })

    maintenances.sort((a, b) => sortByDate(a.date, b.date, SORT_DESC))

    return maintenances
  } else {
    throw response
  }
}

export async function saveMaintenance (data) {
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

export async function deleteMaintenance (id) {
  const response = await fetch(`${endpoint}/${id}`, {
    method: 'DELETE',
  })

  if (response.ok) {
    return await response.json()
  } else {
    throw response
  }
}