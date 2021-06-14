import { Heading, Grid, HStack, Text } from "@chakra-ui/react"
import MdiIcon from "@mdi/react"
import { mdiCalendar, mdiCounter } from "@mdi/js"
import Card from "../app/Card"
import { formatDateTime } from "../../utils/date"
import ListContainer from "../app/ListContainer"

export default function OdometerList ({ odometers, loading, editOdometer, deleteOdometer }) {
  return (
    <ListContainer loading={loading} list={odometers}>
      <Grid
        gap={2}
        py={3}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        { odometers.map(odometer => (
          <Card
            key={odometer.id}
            onEdit={() => { editOdometer(odometer) }}
            onDelete={() => { deleteOdometer(odometer) }}
          >

            <HStack alignItems="flex-end">
              <MdiIcon path={mdiCounter} size={1.5} />
              <Heading>{odometer.value}</Heading>
            </HStack>

            <HStack alignItems="flex-end" mt={1} ml={1.5}>
              <MdiIcon path={mdiCalendar} size={1} />
              <Text>{formatDateTime(new Date(odometer.date))}</Text>
            </HStack>

          </Card>
        ))}
      </Grid>
    </ListContainer>
  )
}
