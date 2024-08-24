'use client'

import Button from "@/components/Button"
import { Form, FormDataHandler } from "@/components/Form"
import PageTransition from "@/components/Transitions/Page"
import { useApiService } from "@/services/api"
import { useToast } from "@/services/toast"
import { Flex, Heading } from "@radix-ui/themes"
import { useRouter } from "next/navigation"

const NewApplication: React.FC = () => {
  const apiService = useApiService()
  const toast = useToast()
  const router = useRouter()

  const formDataHandler: FormDataHandler = (data) => {
    apiService
      .applications.save({ name: data.name })
      .then((response) => {
        toast({
          type: 'success',
          title: response.feedback
        })
        router.push('/app/applications')
      })
      .catch((error) => {
        console.error(error)
        toast({
          type: 'danger',
          title: 'Falha ao tentar salvar',
          message: error.response.data.feedback
        })
      })
  }

  return (
    <PageTransition>
      <Flex direction="column" gap="4">
        <Heading as="h2" align="center">Novo Aplicativo</Heading>
        <Form.Container formData={formDataHandler}>
          <Form.Input placeholder="Nome" id="name" required />

          <Flex gap="4" mt="4" >
            <Button color="gray" style={{ width: "calc(50% - 2px)" }} type="button" onClick={() => router.push('/app/applications')} className="mt-2">
              Cancelar
            </Button>
            <Button color="jade" style={{ width: "calc(50% - 2px)" }} type="submit">
              Salvar
            </Button>
          </Flex>
        </Form.Container>
      </Flex>
    </PageTransition>
  )
}

export default NewApplication
