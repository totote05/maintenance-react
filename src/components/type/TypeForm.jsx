import { useEffect, useState } from "react"
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react"
import MdiIcon from "@mdi/react"
import { mdiWrench, mdiCounter } from "@mdi/js"
import { inputOdometerHandler } from "../../utils/validators"
import FormDialog from "../app/FormDialog"

const FIELD_NAME = 'name'
const FIELD_NEXT_ON = 'nextOn'

export default function TypeForm ({
  data,
  saving,
  isOpen,
  onClose,
  saveHandler,
  cancelHandler
}) {
  const [name, setName] = useState('')
  const [nextOn, setNextOn] = useState('')

  function inputHandler (e) {
    switch (e.target.name) {
      case FIELD_NAME:
        setName(e.target.value ?? null)
        break
      case FIELD_NEXT_ON:
        setNextOn(e.target.value ? Number(e.target.value) : null)
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
  
  useEffect(() => {
    setName(data.name ?? '')
    setNextOn(data.nextOn ?? '')
  }, [data])

  return (
    <FormDialog
      title="Registro de tipo de mantenimientos"
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

          <FormLabel>Tipo de matenimiento</FormLabel>

          <InputGroup>
          
            <InputLeftElement
              pointerEvents="none"
              children={<MdiIcon size={1} path={mdiWrench} />}
            />

            <Input
              name={FIELD_NAME}
              value={name}
              placeholder="Nombre"
              onChange={inputHandler}
            />
          </InputGroup>

        </FormControl>

        <FormControl>

          <FormLabel>Periodicidad</FormLabel>

          <InputGroup>

            <InputLeftElement
              pointerEvents="none"
              children={<MdiIcon size={1} path={mdiCounter} />}
            />

            <Input
              type="number"
              name={FIELD_NEXT_ON}
              value={nextOn}
              placeholder="10000"
              min={1}
              max={999999}
              onChange={inputHandler}
              onKeyPress={inputOdometerHandler}
            />

            <InputRightAddon children="km" />

          </InputGroup>

        </FormControl>

      </VStack>

    </FormDialog>
  )
}
