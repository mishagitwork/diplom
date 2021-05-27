import ApiConnector from '../connector'

class UserActions {
  getList = async (params) => {
    try {
      return await ApiConnector.connector.get('/users', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  delete = async (data) => {
    try {
      return await ApiConnector.connector.delete('/users/' + data.userId)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new UserActions()
