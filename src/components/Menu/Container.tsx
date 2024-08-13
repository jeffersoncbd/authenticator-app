import { X } from "lucide-react"
import React from "react"
import { twJoin } from "tailwind-merge"
import Button from "../Button"
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
  const classes = twJoin([
    'absolute top-0 transition-all duration-200 bg-gray-800',
    'w-full max-w-[250px] h-screen p-4',
    'flex flex-col',
    properties.open ? 'left-0' : '-left-full'
  ])

  return (
    <div className={classes} onClick={(event) => event.stopPropagation()}>
      <div className="flex justify-end">
        <Button className="w-[40px] flex justify-center items-center" onClick={properties.onClose}>
          <X />
        </Button>
      </div>
      <ul className="list-none mt-4 flex-1 flex flex-col gap-4">
        {menuItems.map((menuItem) => (
          <MenuItem
            key={menuItem.path}
            onClick={() => properties.onNavigate(menuItem.path)}
          >
            {menuItem.label}
          </MenuItem>
        ))}
      </ul>
      <Button hoverBgVariant="danger" onClick={properties.onLogout}>Logout</Button>
    </div>
  )
}

export default React.memo(MenuContainer)
