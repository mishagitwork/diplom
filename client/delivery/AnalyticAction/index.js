import ApiConnector from '../connector'

class AnalyticAction {
  countByAttended = async (params) => {
    try {
      return await ApiConnector.connector.get('/analytics/all', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
  countByClassAttended = async (params) => {
    try {
      return await ApiConnector.connector.get('/analytics/class', { params })
    } catch (e) {
      console.error(e)
      return new Error('Network error, try again late')
    }
  }
}

export default new AnalyticAction()
