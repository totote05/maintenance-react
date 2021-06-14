import { Text } from "@chakra-ui/react";
import Loading from "./Loading";

export default function ListContainer ({
  loading, 
  list,
  children
}) {
  return (
    <>
      {loading && <Loading />}

      {!loading && (!list || list.length === 0) &&
        <Text align="center" p={3}>No hay resultados</Text>
      }

      {!loading && children}
    </>
  )
}