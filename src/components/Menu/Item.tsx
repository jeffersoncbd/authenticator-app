import { ButtonProps } from "@radix-ui/themes"
import React from "react"
import Button from "../Button"


const MenuItem: React.FC<ButtonProps> = (properties) => <Button {...properties} fullWidth />

export default MenuItem
