'use client'

import { useSession } from '@/services/session'
import { Flex, Heading, Separator } from '@radix-ui/themes'
import { Menu as MenuIcon, Zap } from 'lucide-react'
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
      <Flex justify="between" align="center" mb="4">
        <Button iconWidth onClick={() => setOpen(true)}>
          <MenuIcon />
        </Button>
        <Flex align="center" gap="2">
          <Heading as="h3" size="4">AuthTor</Heading>
          <Zap size="28px" stroke="#ffff00" />
        </Flex>
      </Flex>
      <Separator mt="0px" mb="4" size="4" />

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
