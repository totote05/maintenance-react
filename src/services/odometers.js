const apiUrl = process.env.REACT_APP_API_URL

export async function getOdometers() {
  const response = await fetch(`${apiUrl}/odometer`)

  if (response.ok) {
    return await response.json()
  } else {
    throw response
  }
}