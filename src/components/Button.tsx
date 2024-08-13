import React, { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonTypes = 'success' | 'warning' | 'danger' | 'info'

const hoverBgColorsMap: Record<ButtonTypes, string> = {
  success: "hover:bg-emerald-700",
  warning: "hover:bg-amber-700",
  danger: "hover:bg-rose-700",
  info: "hover:bg-cyan-700"
}

interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  hoverBgVariant?: ButtonTypes
}

const Button: React.FC<ButtonProperties> = ({ hoverBgVariant, className, ...properties }) => {
  const classes = twMerge(
    'w-full h-[40px] bg-gray-700 rounded-lg transition text-[#FFF] font-bold cursor-pointer',
    hoverBgColorsMap[hoverBgVariant || 'info'],
    className
  )

  return <button {...properties} className={classes} />
}

export default Button
