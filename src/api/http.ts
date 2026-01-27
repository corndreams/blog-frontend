import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  // baseURL: 'https://server.corndreams.top',
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  return config
})

http.interceptors.response.use(
  (resp) => resp,
  (err) => Promise.reject(err)
)

export default http
