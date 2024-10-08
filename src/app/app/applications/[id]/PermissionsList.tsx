import { Card, Checkbox, Flex, ScrollArea, Tooltip } from '@radix-ui/themes'
import React from 'react'

interface Properties {
  permissions: Record<string, number>
}

const PermissionsList: React.FC<Properties> = (properties) => {
  return (
    <Card>
      <Flex justify="between" mb="2" style={{ paddingRight: "16px" }}>
        <b>Chave</b>
        <Flex gap="2">
          <Tooltip content="Read">
            <div style={{ width: "16px", textAlign: "center" }}>R</div>
          </Tooltip>
          <Tooltip content="Update">
            <div style={{ width: "16px", textAlign: "center" }}>W</div>
          </Tooltip>
          <Tooltip content="Delete">
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
          {Object.keys(properties.permissions).map((key) => (
            <li key={key}>
              <Flex justify="between">
                {key}
                <Flex gap="2">
                  {((properties.permissions[key] as any) >>> 0).toString(2).padStart(3, '0').split("").reverse()
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
}

export default PermissionsList
