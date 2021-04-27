import { User } from '@src/models/dbm/User'

export interface INewUniversity {
  fullName: string
  shortName: string
  user?: User
}

export interface IUpdateUniversity extends INewUniversity {
  id: string
}
