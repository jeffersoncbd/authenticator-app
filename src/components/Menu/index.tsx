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
      <Button
        className='w-[40px] flex justify-center items-center cursor-pointer'
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </Button>
      {open && <MenuOverlay onClick={() => setOpen(false)} />}
      <MenuContainer
        open={open}
        onNavigate={(path) => {
          router.push(path)
          setOpen(false)
        }}
        onClose={() => setOpen(false)}
        onLogout={session.logout}
      />
    </>
  )
}

export default Menu
