import ApiConnector from '../connector'

class GroupAction {
  getList = async (params) => {
    try {
      console.log(params)
      return await ApiConnector.connector.get('/groups', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  create = async (data) => {
    try {
      return await ApiConnector.connector.post('/groups', data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new GroupAction()
