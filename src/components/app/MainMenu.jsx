import { IconButton } from "@chakra-ui/button";
import MdiIcon from "@mdi/react"
import { mdiMenu } from "@mdi/js"
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import NavButton from "./NavButton";

export default function MainMenu () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        icon={<MdiIcon path={mdiMenu} size={1}/>}
        variant="main-menu"
        mr="3"
        sx={{":focus:not(:focus-visible)": {shadow: 'none'}}}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >

        <DrawerOverlay />

        <DrawerContent>

          <DrawerCloseButton />

          <DrawerHeader>Menú</DrawerHeader>

          <DrawerBody>

            <VStack alignItems="flex-start">
              
            <NavButton to="/" onClick={onClose}>Realizados</NavButton>
        
            <NavButton to="/type" onClick={onClose}>Tipos</NavButton>
            
            <NavButton to="/odometer" onClick={onClose}>Odómetro</NavButton>

            </VStack>

          </DrawerBody>

        </DrawerContent>

      </Drawer>
    </>
  )
}
