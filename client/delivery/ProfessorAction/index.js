import ApiConnector from '../connector'

class ProfessorAction {
  getList = async (params) => {
    try {
      return await ApiConnector.connector.get('/professors', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  getListByUniversity = async (params) => {
    try {
      return await ApiConnector.connector.get('/professors/university', {
        params,
      })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  create = async (data) => {
    try {
      return await ApiConnector.connector.post('/professors', data)
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  delete = async (data) => {
    try {
      return await ApiConnector.connector.delete(
        '/professors/' + data.professorId
      )
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new ProfessorAction()
