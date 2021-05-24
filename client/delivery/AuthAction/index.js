import ApiConnector from '../connector'
import jwt_decode from 'jwt-decode'

class AuthAction {
  login = async (body) => {
    try {
      const response = await ApiConnector.connector.post('/auth', body)
      if (!response) {
        return new Error('Network error, try again late')
      }
      return response.data
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  refresh = async (token) => {
    try {
      console.log(token)
      const response = await ApiConnector.connector.post('/auth/refresh', {
        token,
      })
      console.log(response)
      if (!response) {
        return new Error('Network error, try again late')
      }
      return response.data
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  refreshTokenTimeout = async (data) => {
    ApiConnector.addTokenToHeaders(data.accessToken)
  }
  decodeToken = () => {
    return jwt_decode(localStorage.getItem('accessToken'))
  }
}

export default new AuthAction()
