import { extendTheme } from '@chakra-ui/react'

export default extendTheme({
  styles: {
    global: {
      body: {
        bg: "brand.background"
      },
    }
  },
  colors: {
    brand: {
      primary: "#026670",
      secondary: "#fce181",
      accent: "#9fedd7",
      cream: "#fef9c7",
      background: "#edeae5"
    }
  },
  components: {
    Button: {
      variants: {
        'nav-button': {
          borderColor: "brand.primary",
          fontColor: "brand.primary",
          _hover: { bg: "brand.accent"},
          _active: {
            bg: "brand.accent",
            color: "brand.primary"
          }
        },
      }
    },
    IconButton: {
      variants: {
        'main-menu': {
          bg: 'brand.background',
        }
      },
    },
  }
})