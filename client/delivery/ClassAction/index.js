import ApiConnector from '../connector'

class ClassAction {
  getList = async (params) => {
    try {
      return await ApiConnector.connector.get('/classes', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  getListById = async (params) => {
    try {
      return await ApiConnector.connector.get(`/classes/${params.classId}`)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  create = async (data) => {
    try {
      return await ApiConnector.connector.post('/classes', data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  update = async (data) => {
    try {
      return await ApiConnector.connector.put('/classes/' + data.id, {
        id: data.id,
        groupId: data.groupId,
        subjectId: data.subjectId,
        professorId: data.professorId,
      })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  delete = async (data) => {
    try {
      return await ApiConnector.connector.delete('/classes/' + data.classId)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new ClassAction()
