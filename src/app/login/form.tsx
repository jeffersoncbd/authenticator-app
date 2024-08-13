'use client'

import Button from "@/components/Button";
import { Form, FormDataHandler } from "@/components/Form";
import { useApiService } from "@/services/api";
import { useSession } from "@/services/session";
import { useToast } from "@/services/toast";
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
        console.log(error)
        toast({
          type: 'danger',
          title: 'falha na autenticação',
          message: error.response.data.feedback
        })
      })
  }

  return (
    <Form.Container
      formData={formDataHandler}
      className="w-full bg-gray-800 rounded-xl mx-auto max-w-[400px] p-6 flex flex-col gap-4"
    >
      <Form.Input label="E-mail" id="email" type="email" required />
      <Form.Input label="Password" id="password" type="password" minLength={8} required />

      <Button type="submit" className="mt-2" hoverBgVariant="success">Entrar</Button>
    </Form.Container>
  )
}

export default LoginForm
