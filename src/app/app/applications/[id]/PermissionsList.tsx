import { Card, Checkbox, Flex, Heading, ScrollArea, Tooltip } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import NewPermissionPopup from './NewPermissionPopup'

interface Properties {
  applicationId: string
  groupId: string
  permissions: Record<string, number>
}

const PermissionsList: React.FC<Properties> = (properties) => {
  const [permissions, setPermissions] = useState(properties.permissions)

  useEffect(() => {
    setPermissions(properties.permissions)
  }, [properties.permissions])

  return (
    <>
      <Flex justify="between" align="baseline" mb="2">
        <Heading as="h5" align="center" size="3">Permissões</Heading>
        <NewPermissionPopup
          applicationId={properties.applicationId}
          groupId={properties.groupId}
          onSave={(key, value) => {
            setPermissions((permissions) => ({ ...permissions, [key]: value }))
          }}
        />
      </Flex>
      <Card>
        <Flex justify="between" mb="2" style={{ paddingRight: "16px" }}>
          <b>Chave</b>
          <Flex gap="2">
            <Tooltip content="Read (Leitura)">
              <div style={{ width: "16px", textAlign: "center" }}>R</div>
            </Tooltip>
            <Tooltip content="Write (Escrita)">
              <div style={{ width: "16px", textAlign: "center" }}>W</div>
            </Tooltip>
            <Tooltip content="Delete (Exclusão)">
              <div style={{ width: "16px", textAlign: "center" }}>D</div>
            </Tooltip>
          </Flex>
        </Flex>

        <ScrollArea type="always" scrollbars="vertical" style={{
          paddingRight: "16px",

          overflow: 'hidden',
          maxHeight: '120px'
        }}>
          <ul style={{ paddingLeft: "24px" }}>
            {Object.keys(permissions).map((key) => (
              <li key={key}>
                <Flex justify="between">
                  {key}
                  <Flex gap="2">
                    {((permissions[key] as any) >>> 0).toString(2).padStart(3, '0').split("").reverse()
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
    </>
  )
}

export default PermissionsList
