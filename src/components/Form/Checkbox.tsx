'use client'

import { Checkbox, CheckboxProps, Flex } from '@radix-ui/themes'
import { Responsive } from '@radix-ui/themes/props'
import React, { useContext } from 'react'
import { FormContext } from './Context'

interface Properties extends CheckboxProps {
  id: string
  label: string
  direction?: Responsive<'row' | 'column' | 'row-reverse' | 'column-reverse'>
}

const FormCheckbox: React.FC<Properties> = ({ label, direction, ...properties }) => {
  const formContext = useContext(FormContext)

  return (
    <Flex align="center" gap="2" direction={direction}>
      <Checkbox
        checked={formContext.formData[properties.id] as boolean}
        onCheckedChange={(value) => {
          formContext.customChangeHandler({ id: properties.id, value: value === true })
        }}
        {...properties}
      />
      {label}
    </Flex>
  )
}

export default FormCheckbox
