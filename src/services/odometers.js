const apiUrl = process.env.REACT_APP_API_URL

const endpoint = `${apiUrl}/odometer`

export async function getOdometers() {
  const response = await fetch(endpoint)

  if (response.ok) {
    return await response.json()
  } else {
    throw response
  }
}

export async function saveOdometer (data) {
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