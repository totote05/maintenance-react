import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading () {
  return (
    <Flex justifyContent="center" py={6}>
      <Spinner color="brand.primary"/>
    </Flex>
  )
}