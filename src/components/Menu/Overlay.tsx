import { Box, BoxProps } from "@radix-ui/themes"

const MenuOverlay: React.FC<BoxProps> = (properties) => {
  return (
    <Box
      {...properties}
      position="absolute"
      top="0"
      right="0"
      bottom="0"
      left="0"
      style={{ backgroundColor: "#00000050", zIndex: 9998 }}
    />
  )
}

export default MenuOverlay
