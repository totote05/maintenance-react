import { useState } from "react";
import {
  Heading,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import MdiIcon from '@mdi/react'
import OdometerForm from "./OdometerForm";
import { saveOdometer } from "../../services/odometers";
import { mdiCarCog } from "@mdi/js";

export default function LastOdometerRegistered ({odometer, onSave}) {
  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function saveHandler (data) {
    setSaving(true)

    try {
      await saveOdometer(data)
      onClose()
      onSave()
    } catch (e) {
      toast({
        title: "Error al guardar.",
        description: "No se pudo guardar el odómetro.",
        status: "error",
        isClosable: true,
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <OdometerForm
        data={{}}
        saving={saving}
        isOpen={isOpen}
        onClose={onClose}
        saveHandler={saveHandler}
        cancelHandler={onClose}
      ></OdometerForm>

      <HStack mt="3">

        <Heading size="sm">Último kilometraje registrado:</Heading>

        {odometer && <>
          <Text>{odometer.value}</Text>
          <Text fontSize="md">km</Text>
        </>}

        {!odometer && <Text>No se ha registrado aún</Text>}

        <IconButton
          aria-label="Registrar nuevo"
          colorScheme="green"
          icon={<MdiIcon path={mdiCarCog} size={1} />}
          onClick={onOpen}
        />

      </HStack>
    </>
  )
}