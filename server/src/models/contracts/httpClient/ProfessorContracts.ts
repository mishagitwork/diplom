import { User } from '@src/models/dbm/User'

export interface INewProfessor {
  position: string
  facultyId: string
  user?: User
}

export interface IUpdateProfessor extends INewProfessor {
  id: string
}
