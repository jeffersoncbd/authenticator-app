'use client'

import { TextField } from '@radix-ui/themes'
import React, { useContext } from 'react'
import { FormContext } from './Context'

interface InputProperties extends TextField.RootProps {
  id: string
}

const FormInput: React.FC<InputProperties> = (properties) => {
  const formContext = useContext(FormContext)

  return (
    <TextField.Root
      {...properties}
      size="3"
      radius="large"
      onChange={formContext.inputChangeHandler}
    />
  )
}

export default FormInput
