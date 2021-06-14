import { Flex, Heading, Spacer } from "@chakra-ui/react"

export default function PageHeading ({children, title}) {
  return (
    <Flex
      py="2"
      borderBottom="0.1em solid"
      borderBottomColor="brand.primary"
      alignItems="center"
    >

      <Heading size="md">{title}</Heading>

      {children && 
        <>
          <Spacer />
          {children}
        </>
      }

    </Flex>
  )
}