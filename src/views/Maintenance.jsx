import { useEffect, useState } from "react"
import MaintenanceForm from "../components/maintenance/MaintenanceForm"
import MaintenaceList from "../components/maintenance/MaintenanceList"
import { deleteMaintenance, getMaintenances, saveMaintenance } from "../services/maintenaces"

function Maintenance () {
  const [maintenances, setMaintenances] = useState([])
  const [maintenance, setMaintenance] = useState({})
  const [formVisible, setFormVisible] = useState(false)

  function showDialogHandler (item = {}) {
    setMaintenance(item)
    setFormVisible(true)
  }

  async function deleteHandler (data) {
    if (window.confirm(`¿Está seguro de querer eliminar el mantenimiento "${data.type.name} - ${data.odometer}"?`)) {
      await deleteMaintenance(data.id)
      loadMaintenances()
    }
  }

  async function saveHandler (data) {
    await saveMaintenance(data)
    setFormVisible(false)
    loadMaintenances()
  }

  function cancelHandler () {
    setFormVisible(false)
  }

  async function loadMaintenances () {
    const maintenances = await getMaintenances()
    setMaintenances(maintenances.reverse())
  }

  useEffect(() => {
    loadMaintenances()
  }, [])

  return (
  <div className="maintenances">

    <h3>Mantenimientos registrados</h3>
    
    <button onClick={() => { showDialogHandler() }}>Registrar nuevo</button>
    
    {formVisible && 
      <MaintenanceForm
        data={maintenance}
        saveHandler={saveHandler}
        cancelHandler={cancelHandler}
      ></MaintenanceForm>}

    { maintenances && 
      <MaintenaceList
        list={maintenances}
        editMaintenance={showDialogHandler}
        deleteMaintenance={deleteHandler}
    ></MaintenaceList> }
  </div>
  )
}

export default Maintenance