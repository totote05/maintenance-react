import { useEffect, useState } from "react"
import {
  Box,
  IconButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import MdiIcon from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import DeleteDialog from "../components/app/DeleteDialog"
import PageHeading from "../components/app/PageHeading"
import OdometerForm from "../components/odometer/OdometerForm"
import OdometerList from "../components/odometer/OdometerList"
import { deleteOdometer, getOdometers, saveOdometer } from "../services/odometers"
import ValidationError from "../errors/ValidationError"

export default function Odometer () {
  const toast = useToast()
  const [odometers, setOdometers] = useState([])
  const [odometer, setOdometer] = useState({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose
  } = useDisclosure()

  function showFormDialogHandler (item = {}) {
    setOdometer({...item})
    onFormOpen()
  }

  function showDeleteDialogHandler (item) {
    setOdometer(item)
    onDeleteOpen()
  }

  async function onDeleteHandler () {
    setDeleting(true)

    try {
      await deleteOdometer(odometer.id)
      onDeleteClose()
      loadOdometers()
    } catch (e) {
      toast({
        title: "Error al eliminar.",
        description: "No se pudo eliminar el odómetro.",
        status: "error",
        isClosable: true,
      })
    } finally {
      setDeleting(false)
    }
  }

  async function saveHandler (data) {
    setSaving(true)

    try {
      await saveOdometer(data)
      onFormClose()
      loadOdometers()
    } catch (e) {
      let description = "No se pudo guardar el odómetro."

      if (e instanceof ValidationError) {
        description = e.message
      }

      toast({
        title: "Error al guardar.",
        status: "error",
        isClosable: true,
        description,
      })
    } finally {
      setSaving(false)
    }
  }
  
  function cancelFormHandler () {
    onFormClose()
  }

  function cancelDeleteHandler () {
    onDeleteClose()
  }
  
  async function loadOdometers () {
    setLoading(true)

    try {
      setOdometers(await getOdometers())
    } catch (e) {
      toast({
        title: "Error al cargar.",
        description: "No se pudieron cargar los odómetros registrados.",
        status: "error",
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOdometers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>

      <PageHeading title="Kilometrajes registrados">
        <IconButton
          aria-label="Agregar"
          colorScheme="green"
          icon={<MdiIcon path={mdiPlus} size={1} />}
          onClick={() => { showFormDialogHandler() }}
        />
      </PageHeading>

      <OdometerForm
        data={odometer}
        saving={saving}
        isOpen={isFormOpen}
        onClose={onFormClose}
        saveHandler={saveHandler}
        cancelHandler={cancelFormHandler}
      ></OdometerForm>

      <DeleteDialog
        title="Eliminar kilometraje"
        deleting={deleting}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onDelete={onDeleteHandler}
        onCancel={cancelDeleteHandler}
      >
        {`¿Desea elminar el kilometraje "${odometer.value}"?`}
      </DeleteDialog>

      <OdometerList
        loading={loading}
        odometers={odometers}
        editOdometer={showFormDialogHandler}
        deleteOdometer={showDeleteDialogHandler}
      ></OdometerList>
    </Box>
  )
}
