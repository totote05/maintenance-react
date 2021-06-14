import { useEffect, useState } from "react"
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
} from "@chakra-ui/react"
import MdiIcon from "@mdi/react"
import { mdiCounter, mdiCalendar, mdiWrench, mdiClock } from "@mdi/js"
import { getTypes } from "../../services/types"
import { formatDate, formatTime, getDateTimeValues } from "../../utils/date"
import { inputOdometerHandler } from "../../utils/validators"
import FormDialog from "../app/FormDialog"

const FIELD_TYPE = 'type'
const FIELD_ODOMETER = 'odometer'
const FIELD_DATE = 'date'
const FIELD_TIME = 'time'

export default function MaintenanceForm ({
  data,
  saving,
  isOpen,
  onClose,
  saveHandler,
  cancelHandler
}) {
  const [type, setType] = useState('')
  const [odometer, setOdometer] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [nextOn, setNextOn] = useState('')
  const [types, setTypes] = useState([])

  function inputHandler (e) {
    switch(e.target.name) {
      case FIELD_TYPE: 
        const id = Number(e.target.value)
        setType(types.find(t => t.id === id) ?? '')
        break
        case FIELD_ODOMETER: 
        const value = e.target.value === '' 
          ? e.target.value 
          : Number(e.target.value)
        setOdometer(value)
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
    setType(data.type ?? '')
    setOdometer(data.odometer ?? '')
    setDate(getDateTimeValues(data.date).date 
      ?? formatDate(new Date()))
    setTime(getDateTimeValues(data.date).time 
      ?? formatTime(new Date()))
    setNextOn(data.nextOn ?? '')
  }, [data])

  useEffect(() => {
    const next = type.nextOn ?? 0
    setNextOn(Number(odometer) + Number(next))
  }, [odometer, type])

  return (
    <FormDialog
      title="Registro de mantenimiento realizado"
      submitLabel="Guardar"
      loadingText="Guardando..."
      loading={saving}
      isOpen={isOpen}
      onClose={onClose}
      onCancel={cancelHandler}
      onSubmit={submitHandler}
    >

      <VStack>

        <FormControl>

          <FormLabel>Tipo de mantenimiento</FormLabel>

          <InputGroup>

            <InputLeftElement
              pointerEvents="none"
              children={<MdiIcon size={1} path={mdiWrench} />}
            />

            <Select
              name={FIELD_TYPE}
              value={type.id}
              onChange={inputHandler}
            >
              <option value="-1">Seleccione un tipo de mantenimiento</option>
              {types.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </Select>
          
          </InputGroup>

        </FormControl>

        <FormControl>

          <FormLabel>Kilometraje</FormLabel>

          <InputGroup>
          
            <InputLeftElement
              pointerEvents="none"
              children={<MdiIcon size={1} path={mdiCounter} />}
            />
                
            <Input
              type="number"
              name={FIELD_ODOMETER}
              value={odometer}
              placeholder="0"
              min={1}
              max={999999}
              onChange={inputHandler}
              onKeyPress={inputOdometerHandler}
            />
          
          </InputGroup>

        </FormControl>

        <FormControl>

          <FormLabel>Fecha</FormLabel>

          <Stack direction={['column', 'row']}>

            <InputGroup>

              <InputLeftElement
                pointerEvents="none"
                children={<MdiIcon size={1} path={mdiCalendar} />}
              />

              <Input
                type="date"
                name={FIELD_DATE}
                value={date}
                placeholder="dd/mm/aaaa"
                onChange={inputHandler}
                onKeyPress={(e) => { e.preventDefault() }}
                />

            </InputGroup>

            <InputGroup>

              <InputLeftElement
                pointerEvents="none"
                children={<MdiIcon size={1} path={mdiClock} />}
              />

              <Input
                type="time"
                name={FIELD_TIME}
                value={time}
                placeholder="HH:mm"
                onChange={inputHandler}
                onKeyPress={(e) => { e.preventDefault() }}
              />

            </InputGroup>

          </Stack>

        </FormControl>

        <FormControl>

          <FormLabel>Próximo</FormLabel>

          <InputGroup>

            <InputLeftElement
              pointerEvents="none"
              children={<MdiIcon size={1} path={mdiCounter} />}
            />

            <Input
              disabled
              type="number"
              value={nextOn}
              placeholder="0.0"
            />

          </InputGroup>

        </FormControl>

      </VStack>

    </FormDialog>
  )
}
