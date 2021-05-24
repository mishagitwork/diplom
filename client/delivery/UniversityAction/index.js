import ApiConnector from '../connector'

class UniversityAction {
  getList = async () => {
    try {
      return await ApiConnector.connector.get('/university')
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  create = async (data) => {
    try {
      return await ApiConnector.connector.post('/university', data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new UniversityAction()
