import { useEffect, useState } from "react"
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react"
import MdiIcon from "@mdi/react"
import { mdiCounter, mdiCalendar, mdiClock } from "@mdi/js"
import { formatDate, formatTime, getDateTimeValues } from "../../utils/date"
import { inputOdometerHandler } from "../../utils/validators"
import FormDialog from "../app/FormDialog"

const FIELD_ODOMETER = "odometer"
const FIELD_DATE = "date"
const FIELD_TIME = 'time'

export default function OdometerForm ({
  data,
  saving,
  isOpen,
  onClose,
  saveHandler,
  cancelHandler 
}) {
  const [odometer, setOdometer] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  function inputHandler (e) {
    switch(e.target.name) {
      case FIELD_ODOMETER:
        setOdometer(e.target.value ? Number(e.target.value) : null)
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
    if (odometer && date) {
      saveHandler({
        id: data.id ?? null,
        value: odometer,
        date: `${date} ${time}:00`,
      })
    }
  }
  
  useEffect(() => {
    setOdometer(data.value ?? '')
    setDate(getDateTimeValues(data.date).date 
      ?? formatDate(new Date()))
    setTime(getDateTimeValues(data.date).time 
      ?? formatTime(new Date()))
  }, [data])

  return (
    <FormDialog
      title="Registro de kilometraje"
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

          <FormLabel>Kilometraje</FormLabel>

          <InputGroup>

            <InputLeftElement
              pointerEvents="none"
              children={<MdiIcon size={1} path={mdiCounter}/>}
            />

            <Input
              type="number"
              name={FIELD_ODOMETER}
              value={odometer}
              min={1}
              max={999999}
              placeholder="0"
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
                children={<MdiIcon size={1} path={mdiCalendar}/>}
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

      </VStack>

    </FormDialog>
  )
}
