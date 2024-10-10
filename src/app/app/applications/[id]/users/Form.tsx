import Button from '@/components/Button'
import { Form } from '@/components/Form'
import { SubmitDataHandler } from '@/components/Form/interfaces'
import { Group } from '@/services/api/interfaces'
import { Flex } from '@radix-ui/themes'
import React from 'react'

interface Properties {
  onSubmitData: SubmitDataHandler
  groups: Group[]
}

const UserForm: React.FC<Properties> = (properties) => {
  return (
    <Form.Container onSubmitData={properties.onSubmitData}>
      <Flex direction="column" gap="4">
        <Form.Input id="name" placeholder="Nome do usuário" required />
        <Form.Input id="email" type="email" placeholder="Email do usuário" required />
        <Form.Input id="password" type="password" placeholder="Senha" required />
        <Form.Select
          id="groupId"
          placeholder='Grupo de permissões'
          options={properties.groups.map((group) => ({ value: group.id, label: group.name }))}
          required
        />
        <Button type="submit">Salvar</Button>
      </Flex>
    </Form.Container>
  )
}

export default UserForm
