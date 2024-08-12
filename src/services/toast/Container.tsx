import { IdentifiedToast } from "./interfaces"
import ToastMessage from "./Message"

interface ToastContainerProperties {
  toasts: IdentifiedToast[]
  closeToast: (id: string) => void
}

const ToastContainer: React.FC<ToastContainerProperties> = ({ toasts, closeToast }) => {
  return (
    <div className="w-full max-w-[400px] absolute right-0 top-0 p-4 ">
      <div className="w-full flex flex-col gap-4">
        {toasts.map((toast) => <ToastMessage
          key={toast.id} {...toast} onClose={() => closeToast(toast.id)}
        />)}
      </div>
    </div>
  )
}

export default ToastContainer
