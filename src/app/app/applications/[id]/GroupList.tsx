import PageTransition from '@/components/Transitions/Page'
import { sortByKey } from '@/helpers/sort'
import { Group } from '@/services/api/interfaces'
import { Box, Card, Flex, Heading, Separator, Spinner } from '@radix-ui/themes'
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import NewPermissionPopup from './NewPermissionPopup'
import PermissionsList from './PermissionsList'

interface Properties {
  groups?: Group[]
}

const GroupList: React.FC<Properties> = ({ groups }) => {
  const [detailedGroup, setDetailedGroup] = useState<string | undefined>()

  if (groups === undefined) {
    return (
      <PageTransition style={{ flex: "1" }}>
        <Flex height="100%" justify="center" align="center">
          <Spinner size="3" />
        </Flex>
      </PageTransition>
    )
  }

  return sortByKey(groups, (item) => item.name).map((group, i) => (
    <PageTransition key={group.id} delay={i / 5}>
      <Card
        key={group.id}
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
          maxHeight: detailedGroup === group.id ? "160px" : "0px",
          transition: "max-height 0.5s"
        }}>
          <Separator size="4" my="2" />

          <Flex justify="between" align="baseline" mb="2">
            <Heading as="h5" align="center" size="3">Permissões</Heading>
            <NewPermissionPopup />
          </Flex>

          <PermissionsList permissions={group.permissions} />
        </Box>

      </Card>
    </PageTransition>
  ))
}

export default GroupList
