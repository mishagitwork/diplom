import { User } from '@src/models/dbm/User'

export interface INewStudent {
  studentCardId: string
  groupId: string
  isMonitor: boolean
  user?: User
}

export interface IUpdateStudent extends INewStudent {
  id: string
}
