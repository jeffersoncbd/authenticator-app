import Button from '@/components/Button'
import { Form, FormDataHandler } from '@/components/Form'
import { useApiService } from '@/services/api'
import { Group, NewUser, User } from '@/services/api/interfaces'
import { useToast } from '@/services/toast'
import { Box, Dialog, Flex } from '@radix-ui/themes'
import { PlusCircle } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

interface Properties {
  applicationId: string
  onSave: (user: User) => void
}

const NewUserPopup: React.FC<Properties> = (properties) => {
  const apiService = useApiService()
  const toast = useToast()
  const closeRef = useRef<HTMLButtonElement>(null)

  const [groups, setGroups] = useState<Group[]>()

  useEffect(() => {
    apiService.applications.groups
      .list(properties.applicationId)
      .then(setGroups)
      .catch(apiService.defaultErrorHandler('Falha ao listar grupos'))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit: FormDataHandler = (data) => {
    if (closeRef.current === null) {
      toast({
        type: 'danger',
        title: 'Falha ao lidar com dados do formulário'
      })
      return
    }
    apiService.applications.users
      .save(properties.applicationId, data as unknown as NewUser)
      .then((response) => {
        toast({
          type: 'success',
          title: response.feedback
        })
        properties.onSave({
          name: data.name,
          email: data.email,
          status: 'active',
          group: groups?.find((group) => group.id === data.groupId)?.name || ''
        })
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
        <Dialog.Title>Novo Usuário</Dialog.Title>
        <Dialog.Description>
          Adicione um usuário na aplicação selecionando um grupo de permissões.
        </Dialog.Description>
        <Box mt="4">
          <Form.Container formData={handleSubmit}>
            <Flex direction="column" gap="4">
              <Form.Input id="name" placeholder="Nome do usuário" required />
              <Form.Input id="email" type="email" placeholder="Email do usuário" required />
              <Form.Input id="password" type="password" placeholder="Senha" required />
              <Form.Select
                id="groupId"
                placeholder='Grupo de permissões'
                options={groups?.map((group) => ({ value: group.id, label: group.name })) || []}
                required
              />
              <Button type="submit">Salvar</Button>
            </Flex>
          </Form.Container>
        </Box>
        <Dialog.Close ref={closeRef} hidden={true}><div /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default NewUserPopup
