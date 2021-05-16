import { useState } from "react"

const FIELD_NAME = 'name'
const FIELD_NEXT_ON = 'nextOn'

function TypeForm ({ data, saveHandler, cancelHandler}) {
  const [name, setName] = useState(data.name ?? '')
  const [nextOn, setNextOn] = useState(data.nextOn ?? '')

  function inputHandler (e) {
    switch (e.target.name) {
      case FIELD_NAME:
        setName(e.target.value)
        break
      case FIELD_NEXT_ON:
        setNextOn(e.target.value)
        break
      default:
        console.warn(`Unkwonwn field ${e.targe.name}`)
    }
  }

  function submitHandler (e) {
    e.preventDefault()
    saveHandler({
      id: data.id ?? null,
      name,
      nextOn,
    })
  }
  return (
    <div className="type-form">

      <h3>Resgistro de tipo de mantenimientos</h3>

      <form>

        <fieldset>
          <label>Tipo de matenimiento</label>
          <input
            name={FIELD_NAME}
            value={name}
            placeholder="Cambio de aceite"
            onChange={inputHandler}
          />
        </fieldset>

        <fieldset>
          <label>Periodicidad</label>
          <input
            name={FIELD_NEXT_ON}
            value={nextOn}
            placeholder="10000"
            onChange={inputHandler}
          />
          km
        </fieldset>

        <button type="button" onClick={cancelHandler}>Cancelar</button>
        <button onClick={submitHandler}>Guardar</button>

      </form>

    </div>
  )
}

export default TypeForm