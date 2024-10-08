import Button from '@/components/Button'
import { Form, FormDataHandler } from '@/components/Form'
import { useApiService } from '@/services/api'
import { Box, Dialog, Flex } from '@radix-ui/themes'
import { PlusCircle } from 'lucide-react'
import React from 'react'

interface Properties {
  applicationId: string,
  groupId: string
}

const NewPermissionPopup: React.FC<Properties> = ({ applicationId, groupId }) => {
  const apiService = useApiService()

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
        <Dialog.Close hidden={true}><div /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default NewPermissionPopup
