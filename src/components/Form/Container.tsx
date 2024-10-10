'use client'

import React, { FormEventHandler, useState } from "react";
import { FormContext } from "./Context";
import { CustomChangeHandler, InputChangeHandler, SubmitDataHandler } from "./interfaces";


interface FormContainerProperties {
  onSubmitData: SubmitDataHandler
  children?: React.ReactNode
}

const FormContainer: React.FC<FormContainerProperties> = ({ onSubmitData, children }) => {
  const [form, setForm] = useState({})

  const inputChangeHandler: InputChangeHandler = (event) => {
    const { id, value } = event.target
    setForm({ ...form, [id]: value })
  }
  const customChangeHandler: CustomChangeHandler = (event) => {
    const { id, value } = event
    setForm({ ...form, [id]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    onSubmitData(form)
  }

  return (
    <FormContext.Provider value={{ formData: form, inputChangeHandler, customChangeHandler }}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  )
}

export default FormContainer
