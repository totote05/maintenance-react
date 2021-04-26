import { useEffect, useState } from "react"
import { TypeList } from "../components/type/TypesList"
import { getTypes } from "../services/types"

function Type () {
  const [types, setTypes] = useState([])

  useEffect(() => {
    async function init () {
      setTypes(await getTypes())
    }

    init()
  }, [])

  return (
    <>
      <h1>Tipos de mantenimientos</h1>
      <button>Agregar</button>
      <TypeList types={types}></TypeList>
    </>
  )
}

export default Type