import R from '@repository'

import { IAnalysticService } from '../layerInterfaces'

class AnalysticService implements IAnalysticService {
  countByAttended = async (studentId: string) => {
    return await R.db.attendance.count(studentId)
  }

  countByClassAttended = async (studentId: string) => {
    return await R.db.attendance.countByClassAttended(studentId)
  }
}

export default new AnalysticService()
