import React, { useState } from 'react'
import './styles.scss'

interface IProps {
  label: string
  errorMessage: string
  onChange: () => void
  id: number
}

function FormInput (props: IProps): JSX.Element {
  const { label, errorMessage, onChange, id, ...inputProps } = props

  const [focused, setFocused] = useState(false)

  const handleFocus = (event: React.FocusEvent<HTMLElement>): void => {
    setFocused(true)
  }

  return (
    <div className='form-input'>
        <label htmlFor="">{label}</label>
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          // Rewrite using onFocus
          onInput={() => { inputProps.name === 'confirmPassword' && setFocused(true) }
          }
          focused={focused.toString()}
        />
        <span>{errorMessage}</span>
    </div>
  )
}

export default FormInput
