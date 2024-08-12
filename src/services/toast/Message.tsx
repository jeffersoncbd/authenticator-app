import { X } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { Toast, ToastType } from "./interfaces"



const colorsMap: Record<ToastType, string> = {
  success: "bg-emerald-700",
  warning: "bg-amber-700",
  danger: "bg-rose-700",
  info: "bg-cyan-700"
}

interface ToastMessageProperties extends Toast {
  onClose: () => void
}

const ToastMessage: React.FC<ToastMessageProperties> = (properties) => {
  return (
    <div className={twMerge(colorsMap[properties.type], 'rounded-md p-2')}>
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{properties.title}</h3>
        <X
          className="cursor-pointer hover:bg-[#00000030] rounded-sm transition"
          onClick={properties.onClose}
        />
      </div>
      {properties.message && (
        <p className="mt-2">
          {properties.message}
        </p>
      )}
    </div>
  )
}

export default ToastMessage
