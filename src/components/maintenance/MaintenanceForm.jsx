import { useEffect, useState } from "react"
import { getTypes } from "../../services/types"
import { formatDate, formatTime, getDateTimeValues } from "../../utils/date"

const FIELD_TYPE = 'type'
const FIELD_ODOMETER = 'odometer'
const FIELD_DATE = 'date'
const FIELD_TIME = 'time'

function MaintenanceForm ({ data, saveHandler, cancelHandler }) {
  const [type, setType] = useState(data.type ?? '')
  const [odometer, setOdometer] = useState(data.odometer ?? '')
  const [date, setDate] = useState(getDateTimeValues(data.date).date 
    ?? formatDate(new Date()))
  const [time, setTime] = useState(getDateTimeValues(data.date).time 
    ?? formatTime(new Date()))
  const [nextOn, setNextOn] = useState(data.nextOn ?? '')
  const [types, setTypes] = useState([])

  function inputHandler (e) {
    switch(e.target.name) {
      case FIELD_TYPE: 
        const id = Number(e.target.value)
        setType(types.find(t => t.id === id) ?? '')
        break
        case FIELD_ODOMETER: 
        setOdometer(Number(e.target.value))
      break
      case FIELD_DATE: 
        setDate(e.target.value)
        break
      case FIELD_TIME: 
        setTime(e.target.value)
        break
      default:
          console.warn(`Unkwonwn field ${e.targe.name}`)
    }
  }

  function submitHandler (e) {
    e.preventDefault()
    if (type && odometer && date && nextOn) {
      saveHandler({
        id: data.id ?? null,
        type: type.id,
        odometer,
        date: `${date} ${time}:00`,
        nextOn,
      })
    }
  }

  useEffect(() => {
    async function init () {
      const types = await getTypes()
      setTypes(types)
    }

    init()
  }, [])

  useEffect(() => {
    const next = type.nextOn ?? 0
    setNextOn(odometer + next)
  }, [odometer, type])

  return (
    <div className="maintenance-form">

      <h3>Registrar un nuevo mantenimiento</h3>

      <form>

        <fieldset>
          <label>Tipo de mantenimiento</label>
          <select
            name={FIELD_TYPE}
            value={type.id}
            onChange={inputHandler}
          >
            <option value="-1">Seleccione un tipo de mantenimiento</option>
            {types.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </fieldset>

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
          <input
            type="time"
            name={FIELD_TIME}
            value={time}
            placeholder="HH:mm"
            onChange={inputHandler}
          />
        </fieldset>

        <fieldset>
          <label>Próximo</label>
          <input
            disabled
            type="number"
            value={nextOn}
            placeholder="0.0"
          />
        </fieldset>

        <button type="button" onClick={cancelHandler}>Cancelar</button>
        <button onClick={submitHandler}>Guardar</button>

      </form>
    </div>
  )
}

export default MaintenanceForm