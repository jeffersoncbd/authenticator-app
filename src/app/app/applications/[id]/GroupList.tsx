import PageTransition from '@/components/Transitions/Page'
import { sortByKey } from '@/helpers/sort'
import { Group } from '@/services/api/interfaces'
import { Card, Checkbox, Flex, Heading, ScrollArea, Separator, Spinner, Tooltip } from '@radix-ui/themes'
import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

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
    </PageTransition>
  ))
}

export default GroupList
