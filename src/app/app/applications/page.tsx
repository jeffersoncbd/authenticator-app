'use client'

import Button from "@/components/Button"
import PageTransition from "@/components/Transitions/Page"
import { useApiService } from "@/services/api"
import { Application } from "@/services/api/interfaces"
import { useToast } from "@/services/toast"
import { Card, Flex, Heading } from "@radix-ui/themes"
import { ChevronRight, CirclePlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Applications: React.FC = () => {
  const router = useRouter()
  const apiService = useApiService()
  const toast = useToast()

  const [applications, setApplications] = useState<Application[]>([])
  const [copyId, setCopyId] = useState<null | string>(null)
  const [open, setOpen] = useState<null | string>(null)

  useEffect(() => {
    apiService
      .applications.list()
      .then(setApplications)
      .catch((error) => {
        console.log(error)
        toast({ title: error.response.data.feedback, type: 'danger' })
      })
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

  return (
    <PageTransition>
      <Flex direction="column" gap="4">
        <Heading as="h2" align="center">Aplicativos</Heading>
        <Flex justify="end">
          <Button onClick={() => router.push('/app/applications/new')}>
            <CirclePlus size={20} /> Novo <span />
          </Button>
        </Flex>
        <ul>
          <Flex direction="column" gap="4">
            {applications.map((app) => (
              <Card key={app.id} style={{ cursor: "pointer" }}>
                <Flex align="center" justify="between">
                  {app.name}
                  <ChevronRight />
                </Flex>
              </Card>
            ))}
          </Flex>
        </ul>
      </Flex>
    </PageTransition>
  )
}

export default Applications
