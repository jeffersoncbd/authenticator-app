import { Card, Checkbox, Flex, ScrollArea, Tooltip } from '@radix-ui/themes'
import React from 'react'

interface Properties {
  permissions: Record<string, number>
}

const PermissionsList: React.FC<Properties> = (properties) => {
  return (
    <Card>
      <ScrollArea type="always" scrollbars="vertical" style={{
        paddingRight: "16px"
      }}>
        <Flex justify="between" mb="2">
          <b>Chave</b>
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
          {Object.keys(properties.permissions).map((key) => (
            <li key={key}>
              <Flex justify="between">
                {key}
                <Flex gap="2">
                  {((properties.permissions[key] as any) >>> 0).toString(2).split("").reverse()
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
