import { Card, Flex } from "@radix-ui/themes"
import { X } from "lucide-react"
import React from "react"
import Button from "../Button"
import ThemeMode from "../ThemeMode"
import MenuItem from "./Item"

interface MenuContainerProperties {
  open: boolean
  onNavigate: (path: string) => void
  onClose: () => void
  onLogout: () => void
}

const menuItems = [
  { path: '/app/dashboard', label: 'Dashboard' },
  { path: '/app/applications', label: 'Aplicativos' },
]

const MenuContainer: React.FC<MenuContainerProperties> = (properties) => {
  return (
    <Card
      onClick={(event) => event.stopPropagation()}
      style={{
        position: "absolute",
        top: "8px",
        transition: "all 0.2s ease-out",
        width: "100%",
        maxWidth: "250px",
        height: "calc(100vh - 16px)",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        left: properties.open ? "8px" : "-100%",
        zIndex: 9999
      }}
    >
      <Flex justify="end" mb="4">
        <Button onClick={properties.onClose} iconWidth>
          <X />
        </Button>
      </Flex>
      <Flex direction="column" gap="4" flexGrow="1">
        {menuItems.map((menuItem) => (
          <MenuItem
            key={menuItem.path}
            onClick={() => properties.onNavigate(menuItem.path)}
          >
            {menuItem.label}
          </MenuItem>
        ))}
      </Flex>
      <Flex justify="center" my="4">
        <ThemeMode />
      </Flex>
      <Button color="crimson" onClick={properties.onLogout}>Logout</Button>
    </Card>
  )
}

export default React.memo(MenuContainer)
