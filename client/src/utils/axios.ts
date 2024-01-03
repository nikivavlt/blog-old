import axios from 'axios'
import store from 'store/store';

const http = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-type': 'application/json'
  }
})

http.interceptors.request.use((config) => {
  const accessToken = store.getState().token;

  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})

// http.interceptors.response.use((response) => response,
//   async (error) => {
//     const { dispatch } = store
//     const originalRequest = error.config
//     if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await http.post('/refresh')
//         console.log(response.data.newAccessToken)
//         console.log(dispatch(setToken(response.data.newAccessToken)))
//         return http.request(originalRequest);
//       } catch (error) {
//         console.log(error)
//       }
//       setCurrentUser(null);
//     }
//   })

// http.interceptors.response.use((config) => {
//   return config
// }, (error) => {
//   const originalRequest = error.config
//   originalRequst._isRetry = true; - для того чтобы убрать бесконечный цикл из интерсептора
//   wrap in try..catch block
//   if (error.response.status === 401 && error.config && !error.config._isRetry) {
//     console.log(error.response)
//     return http.request(originalRequest)
//   }
//   throw error
// })

export default http // axios instead of this
