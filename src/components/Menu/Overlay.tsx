import { HTMLAttributes } from "react"

const MenuOverlay: React.FC<HTMLAttributes<HTMLDivElement>> = (properties) => {
  return <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50" {...properties} />
}

export default MenuOverlay
