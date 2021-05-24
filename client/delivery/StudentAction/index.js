import ApiConnector from '../connector'

class StudentAction {
  getList = async (params) => {
    try {
      return await ApiConnector.connector.get('/students', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  create = async (data) => {
    try {
      return await ApiConnector.connector.post('/students', data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }

  getByID = async (data) => {
    try {
      return await ApiConnector.connector.get('/students/' + data.studentId)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new StudentAction()
