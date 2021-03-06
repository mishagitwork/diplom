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
  update = async (data) => {
    try {
      delete data.userId
      delete data.group
      delete data.facultyId
      return await ApiConnector.connector.put('/students/' + data.id, data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  delete = async (data) => {
    try {
      return await ApiConnector.connector.delete('/students/' + data.studentId)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new StudentAction()
