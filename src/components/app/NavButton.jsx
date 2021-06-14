import { useHistory, useLocation } from "react-router-dom";
import { Button } from "@chakra-ui/button"
import { useBreakpoint } from "@chakra-ui/media-query";

function NavButton ({children, to, onClick}) {
  const history = useHistory()
  const { pathname } = useLocation()

  const onClickHandler = (e) => {
    history.push(to)
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Button
      // variant={pathname === to ? 'nav-button-active' : "nav-button"}
      variant="nav-button"
      isActive={pathname === to}
      isFullWidth={useBreakpoint() === 'base'}
      ml="3"
      sx={{":focus:not(:focus-visible)": {shadow: 'none'}}}
      onClick={onClickHandler}
    >{children}</Button>
  )
}

export default NavButton