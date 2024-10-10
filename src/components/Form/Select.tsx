import { Select } from '@radix-ui/themes'
import React, { useContext } from 'react'
import { FormContext } from './Context'

export interface SelectOption {
  value: string
  label: string
}

interface Properties extends Select.TriggerProps {
  options: SelectOption[]
  required?: boolean
  id: string
}

const FormSelect: React.FC<Properties> = ({ options, required, id, value, ...properties }) => {
  const formContext = useContext(FormContext)

  return (
    <Select.Root
      required={required}
      size="3"
      value={value !== undefined ? value as string : formContext.formData[id] as string}
      onValueChange={(value) => formContext.customChangeHandler({ id, value })}
    >
      <Select.Trigger {...properties} style={{ ...properties.style, borderRadius: '8px' }} />

      <Select.Content>
        <Select.Group>

          {options.map((option) => (
            <Select.Item key={option.value} value={option.value}>
              {option.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default FormSelect
