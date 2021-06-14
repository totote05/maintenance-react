import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBreakpoint
} from "@chakra-ui/react";

export default function DeleteDialog ({
  children,
  title,
  deleting,
  isOpen,
  onClose,
  onDelete,
  onCancel
}) {
  return (
    <Modal size={useBreakpoint() === 'base' ? 'xs' : 'lg'} isOpen={isOpen} onClose={onClose}>

      <ModalOverlay />

      <ModalContent>

        <ModalHeader
          borderTopLeftRadius="md"
          borderTopRightRadius="md"
          bg="red"
          color="white"
          fontSize={["md"]}
        >
          {title}
        </ModalHeader>

        <ModalBody>
          {children}
        </ModalBody>

        <ModalFooter>

          <Button
            disabled={deleting}
            mr={3}
            onClick={onCancel}
          >
            Cancelar
          </Button>

          <Button
            isLoading={deleting}
            loadingText="Eliminando..."
            colorScheme="red"
            onClick={onDelete}
          >
            Eliminar
          </Button>

        </ModalFooter>

      </ModalContent>

    </Modal>
  )
}