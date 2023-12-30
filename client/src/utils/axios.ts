import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json'
  }
})

// http.interceptors.request.use((config) => {
//   console.log('request')
// set header here from state
//   return config
// })

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
