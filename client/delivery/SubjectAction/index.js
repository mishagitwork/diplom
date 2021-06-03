import ApiConnector from '../connector'

class SubjectAction {
  getList = async (params) => {
    try {
      return await ApiConnector.connector.get('/subjects', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  create = async (data) => {
    try {
      return await ApiConnector.connector.post('/subjects', data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  update = async (data) => {
    try {
      return await ApiConnector.connector.put('/subjects/' + data.id, data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  delete = async (data) => {
    try {
      return await ApiConnector.connector.delete('/subjects/' + data.subjectId)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new SubjectAction()
