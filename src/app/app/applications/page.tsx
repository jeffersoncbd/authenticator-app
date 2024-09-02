'use client'

import PageTransition from "@/components/Transitions/Page"
import { sortByKey } from "@/helpers/sort"
import { useApiService } from "@/services/api"
import { Application } from "@/services/api/interfaces"
import { Card, Flex, Heading, Spinner, Text } from "@radix-ui/themes"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import NewApplicationDialog from "./components/NewApplication"

const Applications: React.FC = () => {
  const apiService = useApiService()

  const [applications, setApplications] = useState<Application[]>()

  useEffect(() => {
    apiService
      .applications.list()
      .then(setApplications)
      .catch(apiService.defaultErrorHandler('Falha na listagem de aplicativos'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (applications === undefined) {
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
      <Flex direction="column" gap="4" height="100%" pb="6">
        <Heading as="h2" align="center">Aplicativos</Heading>
        <Flex justify="end">
          <NewApplicationDialog
            onSave={(newApplication) =>
              setApplications((applications) =>
                [...(applications !== undefined ? applications : []), newApplication]
              )
            }
          />
        </Flex>
        <ul>
          <Flex direction="column" gap="4">
            {sortByKey(applications, (item) => item.name).map((app, i) => (
              <PageTransition key={app.id} delay={i / 5}>
                <Link href={`/app/applications/${app.id}`} style={{ textDecoration: 'none' }}>
                  <Card style={{ cursor: "pointer" }}>
                    <Flex align="center" justify="between">
                      <Text color="gray" highContrast>{app.name}</Text>
                      <ChevronRight />
                    </Flex>
                  </Card>
                </Link>
              </PageTransition>
            ))}
          </Flex>
        </ul>
      </Flex>
    </PageTransition>
  )
}

export default Applications
