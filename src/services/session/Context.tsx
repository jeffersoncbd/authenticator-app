'use client'

import { redirect, usePathname } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

interface SessionContextProperties {
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const SessionContext = createContext<SessionContextProperties>({
  token: null,
  login: () => undefined,
  logout: () => undefined,
})

interface SessionProviderProperties {
  children: React.ReactNode
}

const SessionProvider: React.FC<SessionProviderProperties> = ({ children }) => {
  const [token, setToken] = useState<null | string>()
  const pathname = usePathname()

  useEffect(() => {
    setToken(sessionStorage.getItem('token'))
  }, [])

  useEffect(
    () => {
      if (token !== undefined) {
        if (token !== null) { // token is already
          if (pathname === '/login') {
            redirect('/app/dashboard')
          }
        } else { // token is not
          if (pathname.startsWith('/app')) {
            redirect('/login')
          }
        }
      }
    },
    [token, pathname]
  )

  const login = (token: string) => {
    sessionStorage.setItem('token', token)
    setToken(token)
  }
  const logout = () => {
    sessionStorage.removeItem('token')
    setToken(null)
  }

  if (token === undefined) {
    return null
  }

  return (
    <SessionContext.Provider value={{ token, login, logout }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
