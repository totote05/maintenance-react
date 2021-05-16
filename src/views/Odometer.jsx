import { useEffect, useState } from "react"
import OdometerForm from "../components/odometer/OdometerForm"
import OdometerList from "../components/odometer/OdometerList"
import { deleteOdometer, getOdometers, saveOdometer } from "../services/odometers"

function Odometer () {
  const [odometers, setOdometers] = useState([])
  const [odometer, setOdometer] = useState({})
  const [formVisible, setFormVisible] = useState(false)

  function showDialogHandler (item = {}) {
    setOdometer(item)
    setFormVisible(true)
  }

  async function deleteHandler (item) {
    if (window.confirm(`¿Desea elminar el odómetro "${item.value}"?`)) {
      await deleteOdometer(item.id)
      loadOdometers()
    }
  }

  async function saveHandler (data) {
    await saveOdometer(data)
    setFormVisible(false)
    loadOdometers()
  }

  function cancelHandler () {
    setFormVisible(false)
  }

  async function loadOdometers () {
    setOdometers(await getOdometers())
  }

  useEffect(() => {
    loadOdometers()
  }, [])

  return (
    <>
      <h3>Odometros registrados</h3>

      <button onClick={() => { showDialogHandler() }}>Agregar</button>

      {formVisible && 
        <OdometerForm
          data={odometer}
          saveHandler={saveHandler}
          cancelHandler={cancelHandler}
        ></OdometerForm>}

      <OdometerList
        odometers={odometers}
        editOdometer={showDialogHandler}
        deleteOdometer={deleteHandler}
      ></OdometerList>
    </>
  )
}

export default Odometer