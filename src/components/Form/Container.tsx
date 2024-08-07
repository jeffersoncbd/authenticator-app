'use client'

import React, { FormEventHandler, FormHTMLAttributes, useState } from "react";
import { FormContext } from "./Context";
import { FormDataHandler, InputChangeHandler } from "./interfaces";


interface FormContainerProperties extends FormHTMLAttributes<HTMLFormElement> {
  formData: FormDataHandler
}

const FormContainer: React.FC<FormContainerProperties> = ({ formData, ...properties }) => {
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
      <form {...properties} onSubmit={handleSubmit} />
    </FormContext.Provider>
  )
}

export default FormContainer
