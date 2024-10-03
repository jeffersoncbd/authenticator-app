'use client'

import PageTransition from "@/components/Transitions/Page"
import { useApiService } from "@/services/api"
import { Application as ApplicationType, Group } from "@/services/api/interfaces"
import { Flex, Heading, Spinner, Text } from "@radix-ui/themes"
import { Check, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import GroupList from "./GroupList"
import NewGroupDialog from "./NewGroupPopup"

interface ApplicationProperties {
  params: { id: string }
}

const Application: React.FC<ApplicationProperties> = (properties) => {
  const apiService = useApiService()
  const [application, setApplication] = useState<ApplicationType>()
  const [groups, setGroups] = useState<Group[]>()
  const [copyId, setCopyId] = useState<null | string>(null)

  useEffect(() => {
    apiService.applications
      .getById(properties.params.id)
      .then(setApplication)
      .catch(apiService.defaultErrorHandler('Falha ao exibir aplicação'))

    apiService.applications.groups
      .list(properties.params.id)
      .then((setGroups))
      .catch(apiService.defaultErrorHandler('Falha ao listar grupos'))
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

      <Flex justify="between" align="baseline" mb="2">
        <Heading as="h3" align="center" size="4" mt="5">Grupos de usuários</Heading>
        <NewGroupDialog
          applicationId={application.id}
          onSave={(newGroup) =>
            setGroups((groups) => [...(groups !== undefined ? groups : []), newGroup])
          }
        />
      </Flex>
      <Flex direction="column" gap="2">
        <GroupList groups={groups} />
      </Flex>
    </PageTransition>
  )
}

export default Application
