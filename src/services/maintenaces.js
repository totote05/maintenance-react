import { getTypes } from "./types"

const apiUrl = process.env.REACT_APP_API_URL

const endpoint = `${apiUrl}/maintenance`

export async function getMaintenances () {
  const types = await getTypes()

  const response =  await fetch(endpoint)

  if (response.ok) {
    const data = await response.json()
    return data.map(item => ({
      ...item,
      type: types.find(t => t.id === item.type)
    }))
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