import { getTypes } from "./types"

const apiUrl = process.env.REACT_APP_API_URL

export async function getMaintenances () {
  const types = await getTypes()
  console.log(types)

  const response =  await fetch(`${apiUrl}/maintenance`)

  if (response.ok) {
    const data = await response.json()
    return data.map(item => ({
      ...item,
      type: types.filter(t => t.id === item.type)[0]
    }))
  } else {
    throw response
  }
}