import { useEffect, useState } from "react"
import OdometerList from "../components/odometer/OdometerList"
import { getOdometers } from "../services/odometers"

function Odometer () {
  const [odometers, setOdometers] = useState([])

  useEffect(() => {
    async function init () {
      setOdometers(await getOdometers())
    }

    init()
  }, [])

  return (
    <>
      <h3>Odometros registrados</h3>
      <button>Agregar</button>
      <OdometerList odometers={odometers}></OdometerList>
    </>
  )
}

export default Odometer