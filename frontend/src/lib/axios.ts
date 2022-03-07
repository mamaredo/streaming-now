import Axios from 'axios'

export const axios = Axios.create({
  withCredentials: true,
  baseURL: 'https://localhost:8000'
})

axios.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || error.message
    console.error(message)
    return Promise.reject(error)
  }
)
