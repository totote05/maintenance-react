import { Image } from "@chakra-ui/image";
import { Flex, Spacer } from "@chakra-ui/layout";
import { useBreakpoint } from "@chakra-ui/media-query";
import NavButton from "./NavButton";
import MainMenu from './MainMenu'

export default function NavBar () {
  return (
    <Flex px="8" py="4" alignItems="center">

      { useBreakpoint() === 'base' && <MainMenu /> }

      <Image src="/img/brand.svg"/>
      
      { useBreakpoint() !== 'base' &&  <>

        <Spacer />
      
        <NavButton to="/">Realizados</NavButton>
        
        <NavButton to="/type">Tipos</NavButton>
        
        <NavButton to="/odometer">Kilometrajes</NavButton>

      </> }
        
    </Flex>
  )
}
