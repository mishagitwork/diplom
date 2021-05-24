import ApiConnector from '../connector'

class AttendanceAction {
  getList = async (params) => {
    try {
      return await ApiConnector.connector.get('/attendances', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }

  getUniqueList = async (params) => {
    try {
      return await ApiConnector.connector.get('/attendances/unique', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  create = async (data) => {
    try {
      return await ApiConnector.connector.post('/attendances', data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  updateByStudent = async (data) => {
    try {
      return await ApiConnector.connector.put('/attendances/', data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new AttendanceAction()
