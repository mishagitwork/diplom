import { User } from '../dbm/User'

export interface INewStudentDTM {
  studentCardId: string
  isMonitor: boolean
  groupId: string
  user?: User
}
