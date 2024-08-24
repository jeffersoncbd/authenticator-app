'use client'

import React, { FormEventHandler, useState } from "react";
import { FormContext } from "./Context";
import { FormDataHandler, InputChangeHandler } from "./interfaces";


interface FormContainerProperties {
  formData: FormDataHandler
  children?: React.ReactNode
}

const FormContainer: React.FC<FormContainerProperties> = ({ formData, children }) => {
  const [form, setForm] = useState({})

  const inputChangeHandler: InputChangeHandler = (event) => {
    const { id, value } = event.target
    setForm({ ...form, [id]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    formData(form)
  }

  return (
    <FormContext.Provider value={{ inputChangeHandler }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  )
}

export default FormContainer
