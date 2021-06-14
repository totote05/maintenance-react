import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react"

export default function FormDialog ({
  children,
  title,
  submitLabel,
  loading,
  loadingText,
  isOpen,
  onClose,
  onSubmit,
  onCancel
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      
      <ModalOverlay />

      <ModalContent>

        <ModalHeader>{title}</ModalHeader>

        <ModalCloseButton onClick={onCancel} />

        <form>
          <ModalBody>
            {children}
          </ModalBody>

          <ModalFooter>

            <Button
              type="button"
              disabled={loading}
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              colorScheme="green"
              isLoading={loading}
              loadingText={loadingText}
              onClick={onSubmit}
            >
              {submitLabel}
            </Button>

          </ModalFooter>
        </form>

      </ModalContent>

    </Modal>
  )
}