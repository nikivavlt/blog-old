import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import UserService from '../services/users';

const User = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState();
  const location = useLocation();

  const username = location.pathname.split('/')[2]

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const userData = await UserService.getUser(username);
        setUserProfile(userData)
      } catch (error) {
        console.log(error)

        navigate('*')
      }
    }

    fetchUser()
  }, []);

  return (
      <div>
            <div>user-personal.tsx ? / single-user/ userprofile / profile (Personal user information, personal user page) opportunity to upload photo</div>
        { userProfile &&
          <div>
            <div>
              <img src={userProfile.image} alt="User avatar" />
            </div>
            <div>
              { userProfile.username }
            </div>
            <div>
              { userProfile.email }
            </div>
            { userProfile.role === 'admin' ? 'Administrator' : 'User' }
          </div>
        }
      </div>
    )
}

export default User
