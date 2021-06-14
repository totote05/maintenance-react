import { Heading, Grid, HStack, Text, VStack, useBreakpoint } from "@chakra-ui/react"
import MdiIcon from "@mdi/react"
import { mdiCounter, mdiCalendar } from '@mdi/js'
import Card from "../app/Card"
import { formatDateTime } from "../../utils/date"
import ListContainer from "../app/ListContainer"

export default function MaintenaceList ({
  list,
  lastOdometer,
  loading,
  editMaintenance,
  deleteMaintenance
}) {
  const columns = useBreakpoint() === 'base'
    ? "repeat(auto-fill, minmax(300px, 1fr))"
    : "repeat(auto-fill, minmax(350px, 1fr))"
  
  function getColor(maintenance) {
    if (!maintenance.last) {
      return 'black'
    } else if (lastOdometer < maintenance.nextOn) {
      return 'green'
    } else {
      return 'red'
    }
  }

  return (
    <ListContainer loading={loading} list={list}>
      <Grid
        gap={2}
        py={3}
        templateColumns={columns}
      >
        {list.map(item => (
          <Card
            key={item.id}
            onEdit={() => { editMaintenance(item) }}
            onDelete={() => { deleteMaintenance(item) }}
          >

            <Heading size="lg" mb={3}>{item.type?.name}</Heading>

            <HStack alignItems="flex-start" spacing="10px">

              <VStack alignItems="flex-start" flexGrow={1}>

                <Heading size="sm">Próximo</Heading>

                <HStack alignItems="flex-end">
                  <MdiIcon path={mdiCounter} size={1.2}  color={getColor(item)}/>
                  <Heading size="lg" color={getColor(item)}>{item.nextOn}</Heading>
                  <Text color={getColor(item)}>km</Text>
                </HStack>

              </VStack>
              
              <VStack alignItems="flex-start" flexGrow={1}>

                <Heading size="sm">Realizado</Heading>

                <HStack alignItems="flex-end">
                  <MdiIcon path={mdiCounter} size={1} />
                  <Text>{item.odometer}</Text>
                  <Text fontSize="sm">km</Text>
                </HStack>

                <HStack alignItems="flex-start">
                  <MdiIcon path={mdiCalendar} size={1} />
                  <Text>{formatDateTime(new Date(item.date))}</Text>
                </HStack>

              </VStack>

            </HStack>

          </Card>
        ))}
      </Grid>
    </ListContainer>
  )
}
