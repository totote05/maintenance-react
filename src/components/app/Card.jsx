import { Box, HStack, IconButton } from "@chakra-ui/react"
import { mdiPencil, mdiTrashCan } from "@mdi/js"
import MdiIcon from "@mdi/react"

export default function Card ({children, onEdit, onDelete}) {
  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={3}
    >
      {children}
      <HStack justify="flex-end">
        <IconButton
          icon={<MdiIcon size={1}
          path={mdiPencil}/>}
          colorScheme="green"
          onClick={onEdit}
        />
        <IconButton
          icon={<MdiIcon size={1}
          path={mdiTrashCan}/>}
          colorScheme="red"
          onClick={onDelete}
        />
      </HStack>
    </Box>
  )
}
