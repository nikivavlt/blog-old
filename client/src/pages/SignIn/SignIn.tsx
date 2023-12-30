import React, { type FormEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './SignIn.scss'
import { AuthContext } from 'context/AuthContext'

// create service
const SignIn = (): JSX.Element => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const { signIn } = useContext(AuthContext)

  const handleChange = (event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement

    setInputs((previous) => ({ ...previous, [target.name]: target.value }))
  }

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      await signIn(inputs)
      setInputs({ username: '', password: '' })
      navigate('/')
    } catch (error) {
      setError(error.response.data)
      // if (!err?.originalStatus) {
      //   // isLoading: true until timeout occurs
      //   setErrMsg('No Server Response');
      // } else if (err.originalStatus === 400) {
      //     setErrMsg('Missing Username or Password');
      // } else if (err.originalStatus === 401) {
      //     setErrMsg('Unauthorized');
      // } else {
      //     setErrMsg('Login Failed');
      // }
      // errRef.current.focus();
      // }
  }

  return (
    <div className='sign-in'>
      <h1>Sign in</h1>

      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input required type='text' id='username' placeholder='Username' name='username' onChange={handleChange} value={inputs.username}/>

        <label htmlFor='password'>Password</label>
        <input required type='password' placeholder='Password' name='password' onChange={handleChange} value={inputs.password}/>

        <button type='submit'>Sign in</button>
        {error && <p>{error}</p>}

        <span>
          <Link to='/signup'>
            Create account
          </Link>
        </span>
      </form>
    </div>
  )
}

export default SignIn
