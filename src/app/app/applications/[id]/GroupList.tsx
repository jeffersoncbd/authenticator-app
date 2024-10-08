import PageTransition from '@/components/Transitions/Page'
import { sortByKey } from '@/helpers/sort'
import { Group } from '@/services/api/interfaces'
import { Box, Card, Flex, Heading, Separator, Spinner } from '@radix-ui/themes'
import { ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import NewGroupDialog from './NewGroupPopup'
import PermissionsList from './PermissionsList'

interface Properties {
  groups?: Group[]
  applicationId: string
}

const GroupList: React.FC<Properties> = (properties) => {
  const [groups, setGroups] = useState(properties.groups)
  const [detailedGroup, setDetailedGroup] = useState<string | undefined>()

  useEffect(() => {
    setGroups(properties.groups)
  }, [properties.groups])

  if (groups === undefined) {
    return (
      <PageTransition style={{ flex: "1" }}>
        <Flex height="100%" justify="center" align="center">
          <Spinner size="3" />
        </Flex>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Flex justify="between" align="baseline" mb="2">
        <Heading as="h3" align="center" size="4" mt="5">Grupos de permissões</Heading>
        <NewGroupDialog
          applicationId={properties.applicationId}
          onSave={(newGroup) =>
            setGroups([...groups, newGroup])
          }
        />
      </Flex>
      <Flex direction="column" gap="2">
        {sortByKey(groups, (item) => item.name).map((group, i) => (
          <PageTransition key={group.id} delay={i / 5}>
            <Card
              onClick={() => {
                if (detailedGroup === undefined || detailedGroup !== group.id) {
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
                <Heading as="h4" size="3">{group.name}</Heading>
              </Flex>

              <Box style={{
                overflow: 'hidden',
                height: '100%',
                maxHeight: detailedGroup === group.id ? "500px" : "0px",
                transition: "max-height 0.5s",
                cursor: 'default'
              }}
                onClick={(event) => event.stopPropagation()}
              >
                <Separator size="4" my="2" />

                {detailedGroup !== undefined &&
                  <PermissionsList applicationId={properties.applicationId} groupId={detailedGroup} permissions={group.permissions} />
                }
              </Box>

            </Card>
          </PageTransition>
        ))}
      </Flex>
    </PageTransition>
  )
}

export default GroupList
