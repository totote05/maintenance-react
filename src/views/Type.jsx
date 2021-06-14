import { useEffect, useState } from "react"
import { Box, IconButton, useDisclosure, useToast } from "@chakra-ui/react"
import MdiIcon from '@mdi/react'
import { mdiPlus } from '@mdi/js'
import TypeForm from "../components/type/TypeForm"
import TypeList from "../components/type/TypesList"
import { deleteType, getTypes, saveType } from "../services/types"
import PageHeading from "../components/app/PageHeading"
import DeleteDialog from "../components/app/DeleteDialog"

export default function Type () {
  const toast = useToast()
  const [types, setTypes] = useState([])
  const [type, setType] = useState({})
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
    setType(item)
    onFormOpen()
  }

  function showDeleteDialogHandler (item = {}) {
    setType(item)
    onDeleteOpen()
  }

  async function onDeleteHandler () {
    setDeleting(true)

    try {
      await deleteType(type.id)
      onDeleteClose()
      loadTypes()
    } catch (e) {
      toast({
        title: "Error al eliminar.",
        description: "No se pudo eliminar el tipo de mantenimiento.",
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
      await saveType(data)
      onFormClose()
      loadTypes()
    } catch (e) {
      toast({
        title: "Error al guardar.",
        description: "No se pudo guardar el tipo de mantenimiento.",
        status: "error",
        isClosable: true,
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

  async function loadTypes () {
    setLoading(true)

    try {
      setTypes(await getTypes())
      setLoading(false)
    } catch (e) {
      toast({
        title: "Error al cargar.",
        description: "No se pudieron cargar los tipos de mantenimientos.",
        status: "error",
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    loadTypes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>

      <PageHeading title="Tipos de mantenimientos">
        <IconButton
          aria-label="Agregar"
          colorScheme="green"
          icon={<MdiIcon path={mdiPlus} size={1} />}
          onClick={() => { showFormDialogHandler() }}
        />
      </PageHeading>

      <TypeForm
        data={type}
        saving={saving}
        isOpen={isFormOpen}
        onClose={onFormClose}
        saveHandler={saveHandler}
        cancelHandler={cancelFormHandler}
      ></TypeForm>

      <DeleteDialog
        title="Eliminar tipo de mantenimiento"
        deleting={deleting}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onDelete={onDeleteHandler}
        onCancel={cancelDeleteHandler}
      >
        {`¿Desea eliminar el tipo de mantenimiento "${type.name}"?`}
      </DeleteDialog>

      <TypeList
        loading={loading}
        types={types}
        editType={showFormDialogHandler}
        deleteType={showDeleteDialogHandler}
      ></TypeList>
    </Box>
  )
}
