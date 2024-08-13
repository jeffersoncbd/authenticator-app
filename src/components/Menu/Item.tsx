import { HTMLAttributes } from "react"
import Button from "../Button"

const MenuItem: React.FC<HTMLAttributes<HTMLLIElement>> = ({ children, ...properties }) => {
  return (
    <li {...properties}>
      <Button>
        {children}
      </Button>
    </li>
  )
}

export default MenuItem
