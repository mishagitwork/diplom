import ApiConnector from '../connector'

class AuthAction {
  login = async (params) => {
    try {
      const response = await ApiConnector.connector.get('/auth', { params })
      if (!response) {
        return new Error('Network error, try again late')
      }
      return response.data
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new AuthAction()
