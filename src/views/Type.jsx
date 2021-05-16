import { useEffect, useState } from "react"
import TypeForm from "../components/type/TypeForm"
import { TypeList } from "../components/type/TypesList"
import { deleteType, getTypes, saveType } from "../services/types"

function Type () {
  const [types, setTypes] = useState([])
  const [type, setType] = useState({})
  const [formVisible, setFormVisible] = useState(false)

  function showDialogHandler (item = {}) {
    setType(item)
    setFormVisible(true)
  }

  async function deleteHandler (item) {
    if (window.confirm(`¿Desea eliminar el tipo de mantenimiento "${item.name}"?`)) {
      await deleteType(item.id)
      loadTypes()
    }
  }

  async function saveHandler (data) {
    await saveType(data)
    setFormVisible(false)
    loadTypes()
  }

  function cancelHandler () {
    setFormVisible(false)
  }

  async function loadTypes () {
    setTypes(await getTypes())
  }

  useEffect(() => {
    loadTypes()
  }, [])

  return (
    <>
      <h3>Tipos de mantenimientos</h3>

      <button onClick={() => { showDialogHandler() }}>Agregar</button>

      {formVisible &&
        <TypeForm
          data={type}
          saveHandler={saveHandler}
          cancelHandler={cancelHandler}
        ></TypeForm>}

      <TypeList
        types={types}
        editType={showDialogHandler}
        deleteType={deleteHandler}
      ></TypeList>
    </>
  )
}

export default Type