'use client'

import { useSession } from '@/services/session'
import { Menu as MenuIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../Button'
import MenuContainer from './Container'
import MenuOverlay from "./Overlay"

const Menu: React.FC = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const session = useSession()

  if (session.token === null || pathname === '/login' || pathname === '/') {
    return null
  }

  return (
    <>
      <Button iconWidth onClick={() => setOpen(true)}>
        <MenuIcon />
      </Button>
      {open && <MenuOverlay onClick={() => setOpen(false)} />}
      <MenuContainer
        open={open}
        onNavigate={(path) => {
          setOpen(false)
          router.push(path)
        }}
        onClose={() => setOpen(false)}
        onLogout={session.logout}
      />
    </>
  )
}

export default Menu
