import React, { useContext, useEffect, useMemo } from 'react';

import { AuthContext } from 'context/AuthContext';
import { axiosInstance, axiosInstanceTwo } from 'utils/axios';
import { setToken } from 'store/actions/token';
import store from 'store/store';

const Interceptors = ({ children }) => {
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => { // or useMemo
    axiosInstance.interceptors.request.use((config) => {
      const accessToken = store.getState().token;

      if (accessToken !== null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    axiosInstance.interceptors.response.use((response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error.response.status === 401 && !previousRequest.retry) {
        //   previousRequest.retry = true;
          const { dispatch } = store;

          try {
            const response = await axiosInstanceTwo.get('/refresh');

            const { newAccessToken } = response.data;
            dispatch(setToken(newAccessToken));
            return await axiosInstance.request(previousRequest);
          } catch (error) {
            console.log(error);
          }
          setCurrentUser(null);
          // OR await signOut(); SO THEN cleancookie not necessary in backend
        }
        throw error;
      });
  }, [setCurrentUser]);

  return children;
};

export default Interceptors;
