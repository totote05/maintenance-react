const apiUrl = process.env.REACT_APP_API_URL

export async function getTypes() {
  const response = await fetch(`${apiUrl}/type`)

  if (response.ok) {
    return await response.json()
  } else {
    throw response
  }
}