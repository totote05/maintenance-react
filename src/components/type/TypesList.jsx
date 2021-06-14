import { Grid, HStack, Heading, Text } from "@chakra-ui/react"
import MdiIcon from '@mdi/react'
import { mdiWrench, mdiCounter } from '@mdi/js'
import Card from "../app/Card"
import ListContainer from "../app/ListContainer"

export default function TypeList ({types, loading, editType, deleteType}) {
  return (
    <ListContainer loading={loading} list={types}>
      <Grid
        gap={2}
        py={3}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {types.map(type => (
          <Card
            key={type.id}
            onEdit={() => { editType(type) }}
            onDelete={() => { deleteType(type) }}
          >

            <HStack>
              <MdiIcon path={mdiWrench} size={1} />
              <Heading size="md" isTruncated>{type.name}</Heading>
            </HStack>

            <HStack alignItems="flex-end" mt={1} ml={1.3}>
              <MdiIcon path={mdiCounter} size={1} />
              <Text>{type.nextOn}</Text>
              <Text fontSize="sm">km</Text>
            </HStack>

          </Card>
        ))}
      </Grid>
    </ListContainer>
  )
}