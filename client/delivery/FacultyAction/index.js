import ApiConnector from '../connector'

class FacultyAction {
  getList = async (params) => {
    try {
      return await ApiConnector.connector.get('/faculty', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  create = async (data) => {
    try {
      return await ApiConnector.connector.post('/faculty', data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  update = async (data) => {
    try {
      delete data.university
      return await ApiConnector.connector.put('/faculty/' + data.id, data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  delete = async (data) => {
    try {
      return await ApiConnector.connector.delete('/faculty/' + data.facultyId)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new FacultyAction()
