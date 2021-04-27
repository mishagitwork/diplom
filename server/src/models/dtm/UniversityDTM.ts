import { User } from '../dbm/User'

export interface INewUniversityDTM {
  fullName: string
  shortName: string
  user?: User
}
