'use client'

import PageTransition from "@/components/Transitions/Page"
import { useApiService } from "@/services/api"
import { Application as ApplicationType, Group, User } from "@/services/api/interfaces"
import { Flex, Heading, Spinner, Tabs, Text } from "@radix-ui/themes"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import GroupList from "./GroupList"
import UsersList from "./UsersList"

interface ApplicationProperties {
  params: { id: string }
}

const Application: React.FC<ApplicationProperties> = (properties) => {
  const apiService = useApiService()
  const [application, setApplication] = useState<ApplicationType>()
  const [groups, setGroups] = useState<Group[]>()
  const [users, setUsers] = useState<User[]>()
  const [copyId, setCopyId] = useState<null | string>(null)

  useEffect(() => {
    apiService.applications
      .getById(properties.params.id)
      .then(setApplication)
      .catch(apiService.defaultErrorHandler('Falha ao exibir aplicação'))

    apiService.applications.groups
      .list(properties.params.id)
      .then(setGroups)
      .catch(apiService.defaultErrorHandler('Falha ao listar grupos'))

    apiService.applications.users
      .list(properties.params.id)
      .then(setUsers)
      .catch(apiService.defaultErrorHandler('Falha ao listar usuários'))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (copyId !== null) {
      void navigator.clipboard.writeText(copyId)
      setTimeout(() => {
        setCopyId(null)
      }, 1000)
    }
  }, [copyId])

  if (application === undefined) {
    return (
      <PageTransition>
        <Flex height="100%" justify="center" align="center">
          <Spinner size="3" />
        </Flex>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Heading as="h2" size="6" align="center">{application.name}</Heading>
      <Flex
        gap="3"
        align="center"
        justify="center"
        style={{ cursor: 'pointer' }}
        onClick={() => setCopyId(application.id)}
      >
        <Text size="1">{application.id}</Text>
        {copyId === null
          ? <Copy size="14px" />
          : <Check size="14px" />}
      </Flex>

      <Tabs.Root defaultValue="groups-list">
        <Tabs.List>
          <Tabs.Trigger value="groups-list">Grupos</Tabs.Trigger>
          <Tabs.Trigger value="users-list">Usuários</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="groups-list">
          <GroupList groups={groups} applicationId={application.id} />
        </Tabs.Content>

        <Tabs.Content value="users-list">
          <UsersList users={users} applicationId={application.id} />
        </Tabs.Content>
      </Tabs.Root>
    </PageTransition>
  )
}

export default Application
