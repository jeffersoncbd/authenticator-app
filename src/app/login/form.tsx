'use client'

import Button from "@/components/Button";
import { Form, FormDataHandler } from "@/components/Form";
import { useApiService } from "@/services/api";
import { useSession } from "@/services/session";
import { useToast } from "@/services/toast";
import { Box, Card, Flex } from "@radix-ui/themes";
import React from "react";

const LoginForm: React.FC = () => {
  const toast = useToast()
  const apiService = useApiService()
  const session = useSession()

  const formDataHandler: FormDataHandler = (data) => {
    apiService
      .login({ email: data.email, password: data.password })
      .then((response) => {
        toast({
          type: 'success',
          title: response.feedback
        })
        session.login(response.token)
      })
      .catch((error) => {
        console.error(error)
        if (error.response !== undefined) {
          toast({
            type: 'danger',
            title: 'falha na autenticação',
            message: error.response.data.feedback
          })
        } else {
          toast({
            type: 'danger',
            title: 'Erro inesperado',
            message: error.message
          })
        }
      })
  }
  // className="w-full bg-gray-800 rounded-xl mx-auto max-w-[400px] p-6 flex flex-col gap-4"

  return (
    <Box maxWidth="400px" width="100%">
      <Card size="3">
        <Form.Container formData={formDataHandler}>
          <Flex direction="column" gap="4">
            <Form.Input placeholder="E-mail" id="email" type="email" required />
            <Form.Input placeholder="Password" id="password" type="password" minLength={8} required />

            <Button type="submit">Entrar</Button>
          </Flex>
        </Form.Container>
      </Card>
    </Box>
  )
}

export default LoginForm
