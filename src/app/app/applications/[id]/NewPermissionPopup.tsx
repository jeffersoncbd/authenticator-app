import Button from '@/components/Button'
import { Form } from '@/components/Form'
import { useApiService } from '@/services/api'
import { Box, Dialog, Flex } from '@radix-ui/themes'
import { PlusCircle } from 'lucide-react'
import React from 'react'

interface Properties {

}

const NewPermissionPopup: React.FC<Properties> = () => {
  const apiService = useApiService()

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
          Recomendamos que a chave da permissão à descreva de forma curta o recurso como &quot;usuarios&quot; ou &quot;empresas&quot;.
        </Dialog.Description>
        <Box mt="4">
          <Form.Container formData={console.log}>
            <Flex direction="column" gap="4">
              <Form.Input id="key" placeholder="Chave" />
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
