import { useEffect, useState } from "react"
import {
  Box,
  IconButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import MdiIcon from '@mdi/react'
import { mdiWrench } from '@mdi/js'
import MaintenanceForm from "../components/maintenance/MaintenanceForm"
import MaintenaceList from "../components/maintenance/MaintenanceList"
import {
  deleteMaintenance,
  getMaintenances,
  saveMaintenance
} from "../services/maintenaces"
import PageHeading from "../components/app/PageHeading"
import DeleteDialog from "../components/app/DeleteDialog"
import { getLastRegistered as getLastOdometerRegistered } from "../services/odometers"
import LastOdometerRegistered from "../components/odometer/LastOdometerRegistered"

export default function Maintenance () {
  const toast = useToast()
  const [maintenances, setMaintenances] = useState([])
  const [maintenance, setMaintenance] = useState({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [lastOdometer, setLastOdometer] = useState({})
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
    setMaintenance(item)
    onFormOpen()
  }

  function showDeleteDialogHandler (item = {}) {
    setMaintenance(item)
    onDeleteOpen()
  }

  async function onDeleteHandler () {
    setDeleting(true)

    try {
      await deleteMaintenance(maintenance.id)
      onDeleteClose()
      loadMaintenances()
    } catch (e) {
      toast({
        title: "Error al eliminar.",
        description: "No se pudo eliminar el mantenimiento realizado.",
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
      await saveMaintenance(data)
      onFormClose()
      loadMaintenances()
    } catch (e) {
      toast({
        title: "Error al guardar.",
        description: "No se pudo guardar el mantenimiento.",
        status: "error",
        isClosable: true,
      })
    } finally{
      setSaving(false)
    }
  }

  function cancelFormHandler () {
    onFormClose()
  }

  function cancelDeleteHandler () {
    onDeleteClose()
  }

  async function loadMaintenances () {
    setLoading(true)

    try {
      setMaintenances(await getMaintenances())
    } catch (e) {
      toast({
        title: "Error al cargar.",
        description: "No se pudieron cargar los mantenimientos realizados.",
        status: "error",
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  function refreshData () {
    loadMaintenances()
    getLastOdometerRegistered().then(last => {
      setLastOdometer(last)
    })
  }

  useEffect(() => {
    refreshData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
  <Box>

    <PageHeading title="Mantenimientos realizados">
      <IconButton
        aria-label="Registrar mantenimiento realizado"
        colorScheme="green"
        icon={<MdiIcon path={mdiWrench} size={1} />}
        onClick={() => { showFormDialogHandler() }}
      />
    </PageHeading>
    
    <MaintenanceForm
      data={maintenance}
      saving={saving}
      isOpen={isFormOpen}
      onClose={onFormClose}
      saveHandler={saveHandler}
      cancelHandler={cancelFormHandler}
    ></MaintenanceForm>

    <DeleteDialog
      title="Eliminar mantenimiento realizado"
      deleting={deleting}
      isOpen={isDeleteOpen}
      onClose={onDeleteClose}
      onDelete={onDeleteHandler}
      onCancel={cancelDeleteHandler}
    >
      {`¿Está seguro de querer eliminar el mantenimiento "${maintenance.type?.name} - ${maintenance.odometer}"?`}
    </DeleteDialog>

    { !loading && <LastOdometerRegistered
      odometer={lastOdometer}
      onSave={refreshData}
    /> }

    <MaintenaceList
      loading={loading}
      list={maintenances}
      lastOdometer={lastOdometer?.value}
      editMaintenance={showFormDialogHandler}
      deleteMaintenance={showDeleteDialogHandler}
    ></MaintenaceList>
  </Box>
  )
}