import PageTransition from '@/components/Transitions/Page'
import { sortByKey } from '@/helpers/sort'
import { User } from '@/services/api/interfaces'
import { Card, Flex, Heading, Spinner } from '@radix-ui/themes'
import React, { useEffect, useState } from 'react'
import NewUserPopup from './NewUserPopup'

interface Properties {
  users?: User[]
  applicationId: string
}

const UsersList: React.FC<Properties> = (properties) => {
  const [users, setUsers] = useState(properties.users)

  useEffect(() => {
    setUsers(properties.users)
  }, [properties.users])

  if (users === undefined) {
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
        <Heading as="h3" align="center" size="4" mt="5">Usuários da aplicação</Heading>
        <NewUserPopup
          applicationId={properties.applicationId}
          onSave={(user) => setUsers([...users, user])}
        />
      </Flex>
      <Flex direction="column" gap="2">
        {sortByKey(users, (item) => item.name).map((user, i) => (
          <PageTransition key={user.email} delay={i / 5}>
            <Card>
              <Heading as="h4" size="3">{user.name} - {user.email}</Heading>
              <Flex justify="between" align="end">
                {user.group}
                <div style={{
                  height: '16px',
                  width: '16px',
                  backgroundColor: user.status === 'active' ? 'limegreen' : 'gray',
                  borderRadius: '50%'
                }} />
              </Flex>
            </Card>
          </PageTransition>
        ))}
      </Flex>
    </PageTransition>
  )
}

export default UsersList
