import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import UserService from '../../services/users';
import { AuthContext } from 'context/AuthContext';
import FormInput from 'components/FormInput/FormInput';

const User = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState();
  const [values, setValues] = useState({
    username: '',
    email: ''
  });

  const location = useLocation();

  const username = location.pathname.split('/')[2];

  const handleChange = (event: React.FormEvent): void => {
    const target = event.target as HTMLInputElement

    setValues({ ...values, [target.name]: target.value })
    // setInputs((previous) => ({ ...previous, [event.target.name]: event.target.value }))
  };

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
  ];

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const userData = await UserService.getUser(username);
        setUserProfile(userData)
        console.log(userData)
      } catch (error) {
        console.log(error)

        navigate('*')
      }
    }

    fetchUser()
  }, []);

  return (
      <div>
          Profile
          { userProfile &&
          <>
            <form action="">
              <img src={userProfile?.image} alt="User avatar" />
              { userProfile.role === 'admin' ? 'Administrator' : 'User' }
              {inputs.map((input) => (
                <FormInput key={input.id} {...input} value={input.name === 'username' ? userProfile?.username : userProfile?.email} onChange={handleChange} />
              ))}
              <button type='submit'>Update</button>
            </form>
            <div>
              <span>
                {/* red color */}
                Delete account
              </span>
            </div>
          </>
          }
            <div>user-personal.tsx ? / single-user/ userprofile / profile (Personal user information, personal user page) opportunity to upload photo</div>
      </div>
    )
}

export default User
