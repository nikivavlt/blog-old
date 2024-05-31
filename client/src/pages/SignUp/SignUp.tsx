import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './SignUp.scss'
import UserService from 'services/users'
import FormInput from 'components/FormInput/FormInput'


// add google oauth 
// https://www.youtube.com/watch?v=Kkht2mwSL_I
// 3:14:24

const SignUp = (): JSX.Element => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState(null) // errorMessage, setErrorMessage

  const navigate = useNavigate()

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage: 'Username should be 3-16 characters and shouldn\'t include any special character!',
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
      required: true
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm password',
      errorMessage: 'Passwords don\'t match!',
      label: 'Confirm password',
      pattern: values.password,
      required: true
    }
  ]

  const handleChange = (event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement

    setValues({ ...values, [target.name]: target.value })
    // setInputs((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    try {
      // setLoading(true)
      // setErrorMessage (null)
      setValues({ username: '', email: '', password: '', confirmPassword: '' })

      // Write validations for backend
      await UserService.signUp(inputs.username, inputs.email, inputs.password)
      // check if it suceessfully
      // setLoading(false)
      // if(signUp.ok) { move navigate here }
      navigate('/signin')
    } catch (error) {
      setError(error.response.data)
      // setLoading(false)
    }
  }

  return (
    <div className='sign-up'>
      <h1>Sign up</h1>
      <form action='' onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleChange} />
        ))}

        {/* errorMessage: '',<
        errorMessage: '',label htmlFor='username'>Username</
        label>
        <input required type='text' id='username' placeholder='Username' name='username' onChange={handleChange}/>

        errorMessage: '',<
        errorMessage: '',label htmlFor='email'>Email</
        label>
        <input required type='email' id='email' placeholder='Email' name='email' onChange={handleChange}/>

        errorMessage: '',<
        errorMessage: '',label htmlFor='password'>Password</
        label>
        <input required type='password' placeholder='Password' name='password' onChange={handleChange}/> */}

        {/* disabled={loading}
          { loading ? (
            <div>Loading or spinner...</div>
          ) : Sign Up}
        */}
        <button type='submit'>Sign Up</button> 
        {error && <p>{error}</p>}

        {/* // Have an account? */}
        <span>
          Do you have an account? <Link to='/signin'>Sign in</Link>
        </span>
      </form>
    </div>
  )
}

export default SignUp
