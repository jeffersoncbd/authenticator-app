import Button from "@/components/Button"
import { Form } from "@/components/Form"
import { SubmitDataHandler } from "@/components/Form/interfaces"
import { useApiService } from "@/services/api"
import { Group } from "@/services/api/interfaces"
import { useToast } from "@/services/toast"
import { Box, Dialog, Flex } from "@radix-ui/themes"
import { PlusCircle } from "lucide-react"
import { useRef } from "react"

interface Properties {
  applicationId: string
  onSave: (newGroup: Group) => void
}

const NewGroupPopup: React.FC<Properties> = (properties) => {
  const apiService = useApiService()
  const toast = useToast()
  const closeRef = useRef<HTMLButtonElement>(null)

  const handleSubmit: SubmitDataHandler = (data) => {
    if (closeRef.current === null) {
      toast({
        type: 'danger',
        title: 'Falha ao lidar com dados do formulário'
      })
      return
    }
    apiService
      .applications.groups.save(properties.applicationId, { name: data.name as string })
      .then((response) => {
        toast({
          type: 'success',
          title: response.feedback
        })
        properties.onSave({ id: response.id, name: data.name as string, permissions: {} })
        closeRef.current?.click()
      })
      .catch(apiService.defaultErrorHandler('Falha ao tentar salvar'))
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="2">
          <PlusCircle size={16} />
          Novo
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Novo Grupo</Dialog.Title>
        <Dialog.Description>
          Crie um novo grupo de permissões para esta aplicação.
        </Dialog.Description>
        <Box mt="4">
          <Form.Container onSubmitData={handleSubmit}>
            <Flex direction="column" gap="4">
              <Form.Input id="name" placeholder="Nome do grupo" required />
              <Button type="submit">Salvar</Button>
            </Flex>
          </Form.Container>
        </Box>
        <Dialog.Close ref={closeRef} hidden={true}><div /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default NewGroupPopup
