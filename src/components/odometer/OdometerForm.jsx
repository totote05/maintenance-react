import { useState } from "react"
import { formatDate } from "../../utils/date"

const FIELD_ODOMETER = "odometer"
const FIELD_DATE = "date"

function OdometerForm ({ data, saveHandler, cancelHandler }) {
  const [odometer, setOdometer] = useState(data.value ?? '')
  const [date, setDate] = useState(data.date ??  formatDate(new Date()))
  
  function inputHandler (e) {
    switch(e.target.name) {
      case FIELD_ODOMETER:
        setOdometer(e.target.value)
        break
      case FIELD_DATE:
        setDate(e.target.value)
        break
        default:
          console.warn(`Unkwonwn field ${e.targe.name}`)
    }
  }

  function submitHandler (e) {
    e.preventDefault()
    if (odometer && date) {
      saveHandler({
        id: data.id ?? null,
        value: odometer,
        date,
      })
    }
  }

  return (
    <div className="odometer-form">

      <h3>Registro de odómetro</h3>

      <form>

        <fieldset>
          <label>Odómetro</label>
          <input
            type="number"
            name={FIELD_ODOMETER}
            value={odometer}
            placeholder="0.0"
            onChange={inputHandler}
          />
        </fieldset>

        <fieldset>
          <label>Fecha</label>
          <input
            type="date"
            name={FIELD_DATE}
            value={date}
            placeholder="dd/mm/aaaa"
            onChange={inputHandler}
          />
        </fieldset>

        <button type="button" onClick={cancelHandler}>Cancelar</button>
        <button onClick={submitHandler}>Guardar</button>

      </form>
      
    </div>
  )
}

export default OdometerForm