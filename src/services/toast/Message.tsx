import { Box, Callout, Card, Flex, Heading, Text } from "@radix-ui/themes"
import { AlertCircle, CircleCheck, CircleX, Info, X } from "lucide-react"
import { Toast, ToastType } from "./interfaces"

const colorsMap: Record<ToastType, any> = {
  success: "jade",
  warning: "amber",
  danger: "crimson",
  info: "indigo"
}

const iconsMap: Record<ToastType, any> = {
  success: <CircleCheck />,
  warning: <AlertCircle />,
  danger: <CircleX />,
  info: <Info />
}

interface ToastMessageProperties extends Toast {
  onClose: () => void
}

const ToastMessage: React.FC<ToastMessageProperties> = (properties) => {
  return (
    <Card style={{ padding: "0px" }}>
      <Callout.Root variant="soft" color={colorsMap[properties.type]} style={{ display: 'flex', alignItems: 'center' }}>
        <Callout.Icon>
          {iconsMap[properties.type]}
        </Callout.Icon>
        <Box flexGrow="1">
          <Flex width="100%" justify="between" align="center">
            <Heading as="h3" size="4">{properties.title}</Heading>
            <X
              size="28px"
              style={{ cursor: 'pointer', backgroundColor: '#00000030', borderRadius: '8px', padding: '4px' }}
              onClick={properties.onClose}
            />
          </Flex>
          {properties.message && (
            <Text>
              {properties.message}
            </Text>
          )}
        </Box>
      </Callout.Root>
    </Card>
  )
}

export default ToastMessage
