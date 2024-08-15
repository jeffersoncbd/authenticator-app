import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonTypes = 'success' | 'warning' | 'danger' | 'info'

const hoverBgColorsMap: Record<ButtonTypes, string> = {
  success: "hover:bg-emerald-600",
  warning: "hover:bg-amber-600",
  danger: "hover:bg-rose-600",
  info: "hover:bg-cyan-600"
}
const bgColorsMap: Record<ButtonTypes, string> = {
  success: "bg-emerald-700",
  warning: "bg-amber-700",
  danger: "bg-rose-700",
  info: "bg-cyan-700"
}

interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  bgVariant?: ButtonTypes
  hoverBgVariant?: ButtonTypes
  iconWidth?: boolean
}

const Button: React.FC<ButtonProperties> = ({ className, bgVariant, hoverBgVariant, iconWidth, ...properties }) => {
  const classes = twMerge(
    'h-[40px] rounded-lg transition text-[#FFF] font-bold cursor-pointer',
    bgVariant !== undefined ? bgColorsMap[bgVariant] : 'bg-gray-700',
    hoverBgColorsMap[hoverBgVariant || 'info'],
    iconWidth === true ? 'w-[40px] flex justify-center items-center' : 'w-full',
    className
  )

  return <button {...properties} className={classes} />
}

export default Button
