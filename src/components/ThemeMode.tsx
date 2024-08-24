'use client'

import { ThemeModeContext } from "@/services/themeMode"
import { Flex, Switch } from "@radix-ui/themes"
import { Moon, Sun } from "lucide-react"
import { useContext } from "react"

const ThemeMode: React.FC = () => {
  const { mode, toggleMode } = useContext(ThemeModeContext)

  return (
    <Flex align="center" gap="4">
      <Moon />
      <Switch color="gray" checked={mode === 'light'} onCheckedChange={toggleMode} />
      <Sun />
    </Flex>
  )
}

export default ThemeMode
