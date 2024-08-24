import { Box, Flex } from "@radix-ui/themes"
import { IdentifiedToast } from "./interfaces"
import ToastMessage from "./Message"

interface ToastContainerProperties {
  toasts: IdentifiedToast[]
  closeToast: (id: string) => void
}

const ToastContainer: React.FC<ToastContainerProperties> = ({ toasts, closeToast }) => {
  if (toasts.length === 0) {
    return null
  }

  return (
    <Box width="100%" maxWidth="400px" position="absolute" right="0" top="0" p="2" style={{ zIndex: "99999" }}>
      <Flex width="100%" direction="column" gap="8">
        {toasts.map((toast) => <ToastMessage
          key={toast.id} {...toast} onClose={() => closeToast(toast.id)}
        />)}
      </Flex>
    </Box>
  )
}

export default ToastContainer
