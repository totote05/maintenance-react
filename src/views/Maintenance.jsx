import { useEffect, useState } from "react"
import MaintenaceList from "../components/maintenance/MaintenanceList"
import { getMaintenances } from "../services/maintenaces"

function Maintenance () {
  const [data, setData] = useState([])

  useEffect(() => {
    async function init() {
    const maintenances = await getMaintenances()
    setData(maintenances)
    }
    init()
  }, [])

  return (
  <div className="maintenances">
    <h3>Mantenimientos registrados</h3>
    <button>Registrar nuevo</button>
    { data && <MaintenaceList list={data}/> }
  </div>
  )
}

export default Maintenance