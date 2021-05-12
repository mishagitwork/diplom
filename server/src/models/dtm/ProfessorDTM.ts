import { User } from '../dbm/User'

export interface INewProfessorDTM {
  position: string
  facultyId: string
  user?: User
}
