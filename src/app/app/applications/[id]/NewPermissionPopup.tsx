import Button from '@/components/Button'
import { Form, FormDataHandler } from '@/components/Form'
import { useApiService } from '@/services/api'
import { useToast } from '@/services/toast'
import { Box, Dialog, Flex } from '@radix-ui/themes'
import { PlusCircle } from 'lucide-react'
import React, { useRef } from 'react'

interface Properties {
  applicationId: string,
  groupId: string,
  onSave: (key: string, value: number) => void
}

const NewPermissionPopup: React.FC<Properties> = ({ applicationId, groupId, onSave }) => {
  const apiService = useApiService()
  const toast = useToast()
  const closeRef = useRef<HTMLButtonElement>(null)

  const handler: FormDataHandler = (data) => {

    const newPermission = {
      key: data.key,
      permission: 0
    }
    if (data.read) {
      newPermission.permission += 1
    }
    if (data.write) {
      newPermission.permission += 2
    }
    if (data.delete) {
      newPermission.permission += 4
    }

    apiService.applications.groups.permissions.add(applicationId, groupId, newPermission)
      .then((response) => {
        toast({
          type: 'success',
          title: response.feedback
        })
        onSave(newPermission.key, newPermission.permission)
        closeRef.current?.click()
      })
      .catch(apiService.defaultErrorHandler('Falha ao tentar salvar'))
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1" onClick={(event) => event.stopPropagation()}>
          <PlusCircle size={12} />
          Adicionar
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Adicionar Permissão</Dialog.Title>
        <Dialog.Description style={{ textAlign: 'justify' }}>
          utilize nomes descritivos que reflitam claramente a funcionalidade da chave, como por exemplo &quot;usuarios&quot;, &quot;empresas&quot; ou &quot;dashboard&quot;.
        </Dialog.Description>
        <Box mt="4">
          <Form.Container formData={handler}>
            <Flex direction="column" gap="4">
              <Form.Input id="key" placeholder="Chave" />
              <Flex justify="between">
                <Form.Checkbox id="read" label="Leitura" />
                <Form.Checkbox id="write" label="Escrita" />
                <Form.Checkbox id="delete" label="Exclusão" />
              </Flex>
              <Button type="submit">Salvar</Button>
            </Flex>
          </Form.Container>
        </Box>
        <Dialog.Close ref={closeRef} hidden={true}><div /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default NewPermissionPopup
