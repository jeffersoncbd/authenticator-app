'use client'

import Button from "@/components/Button"
import { Form, FormDataHandler } from "@/components/Form"
import { useApiService } from "@/services/api"
import { Application } from "@/services/api/interfaces"
import { useToast } from "@/services/toast"
import { Box, Dialog, Flex } from "@radix-ui/themes"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef } from "react"

interface NewApplicationDialogProperties {
  onSave: (newGroup: Application) => void
}

const NewApplicationDialog: React.FC<NewApplicationDialogProperties> = ({ onSave }) => {
  const apiService = useApiService()
  const toast = useToast()
  const router = useRouter()
  const closeRef = useRef<HTMLButtonElement>(null)

  const formDataHandler: FormDataHandler = (data) => {
    apiService
      .applications.save({ name: data.name })
      .then((response) => {
        toast({
          type: 'success',
          title: response.feedback
        })
        onSave({ id: response.id, name: data.name })
        closeRef.current?.click()
      })
      .catch(apiService.defaultErrorHandler('Falha ao tentar salvar'))
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="2">
          <PlusIcon size={16} />
          Novo
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Novo Aplicativo</Dialog.Title>
        <Dialog.Description>
          Registre seu aplicativo.
        </Dialog.Description>
        <Box mt="4">
          <Form.Container formData={formDataHandler}>
            <Form.Input placeholder="Nome" id="name" required />

            <Flex gap="4" mt="4" >
              <Dialog.Close style={{ width: "calc(50% - 2px)" }}>
                <Button color="gray" type="button" className="mt-2">
                  Cancelar
                </Button>
              </Dialog.Close>

              <Button color="jade" style={{ width: "calc(50% - 2px)" }} type="submit">
                Salvar
              </Button>
            </Flex>
          </Form.Container>
        </Box>
        <Dialog.Close ref={closeRef} hidden={true}><div /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default NewApplicationDialog
