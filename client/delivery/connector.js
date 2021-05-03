import Axios from 'axios'

class ApiConnector {
  connector
  token = null

  constructor() {
    this.connector = Axios.create()

    this.connector.interceptors.request.use((config) => {
      const newConfig = { ...config }
      if (process.client) {
        newConfig.baseURL = '/api'
      }
      if (process.server) {
        newConfig.baseURL =
          (process.env.API_URL || 'http://localhost:4000') + '/api'
      }
      if (this.token) {
        newConfig.headers.Authorization = this.token
      }

      return newConfig
    })
  }

  addTokenToHeaders(token) {
    this.token = token
  }
}

export default new ApiConnector()
