'use client'

import PageTransition from "@/components/Transitions/Page"
import { sortByKey } from "@/helpers/sort"
import { useApiService } from "@/services/api"
import { Application as ApplicationType, Group } from "@/services/api/interfaces"
import { Card, Checkbox, Flex, Heading, ScrollArea, Separator, Spinner, Text, Tooltip } from "@radix-ui/themes"
import { Check, ChevronRight, Copy } from "lucide-react"
import { useEffect, useState } from "react"
import NewGroupDialog from "./components/NewGroup"

interface ApplicationProperties {
  params: { id: string }
}

const Application: React.FC<ApplicationProperties> = (properties) => {
  const apiService = useApiService()
  const [application, setApplication] = useState<ApplicationType>()
  const [groups, setGroups] = useState<Group[]>()
  const [copyId, setCopyId] = useState<null | string>(null)
  const [detailedGroup, setDetailedGroup] = useState<string | undefined>()

  useEffect(() => {
    apiService.applications
      .getById(properties.params.id)
      .then(setApplication)
      .catch(apiService.defaultErrorHandler('Falha ao exibir aplicação'))

    apiService.applications.groups
      .list(properties.params.id)
      .then(setGroups)
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

      <Flex justify="between" align="end" mt="6" mb="4">
        <Heading as="h3" size="4" mb="-1">Grupos de usuários</Heading>
        <NewGroupDialog
          applicationId={application.id}
          onSave={(newGroup) =>
            setGroups((groups) => [...(groups !== undefined ? groups : []), newGroup])
          }
        />
      </Flex>
      <Flex direction="column" gap="2">
        {groups === undefined
          ? (
            <PageTransition style={{ flex: "1" }}>
              <Flex height="100%" justify="center" align="center">
                <Spinner size="3" />
              </Flex>
            </PageTransition>
          )
          : sortByKey(groups, (item) => item.name).map((group) => (
            <Card
              key={group.id}
              onClick={() => {
                if (detailedGroup === undefined) {
                  setDetailedGroup(group.id)
                } else {
                  setDetailedGroup(undefined)
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <Flex gap="2">
                <ChevronRight
                  style={{
                    transform: detailedGroup === group.id ? "rotate(90deg)" : undefined,
                    transition: "transform 0.2s"
                  }}
                />
                <Heading as="h4" size="3" >{group.name}</Heading>
              </Flex>
              <ScrollArea style={{
                maxHeight: detailedGroup === group.id ? "160px" : "0px",
                paddingRight: "16px",
                transition: "max-height 0.5s"
              }}>
                <Separator size="4" my="2" />
                <Flex justify="between" mb="2">
                  Permissões:
                  <Flex gap="2">
                    <Tooltip content="Read">
                      <div style={{ width: "16px", textAlign: "center" }}>R</div>
                    </Tooltip>
                    <Tooltip content="Update">
                      <div style={{ width: "16px", textAlign: "center" }}>U</div>
                    </Tooltip>
                    <Tooltip content="Delete">
                      <div style={{ width: "16px", textAlign: "center" }}>D</div>
                    </Tooltip>
                  </Flex>
                </Flex>
                <ul style={{ paddingLeft: "24px" }}>
                  {Object.keys(group.permissions).map((key) => (
                    <li key={key}>
                      <Flex justify="between">
                        {key}
                        <Flex gap="2">
                          {((group.permissions[key] as any) >>> 0).toString(2).split("").reverse()
                            .map((permission, i) =>
                              <Checkbox key={i} checked={permission === "1"} />
                            )}
                        </Flex>
                      </Flex>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </Card>
          )
          )}
      </Flex>
    </PageTransition>
  )
}

export default Application
