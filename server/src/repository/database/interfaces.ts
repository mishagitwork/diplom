import { IFuncResultModel } from '@models/common/FuncResultModel'
import { Faculty } from '@src/models/dbm/Faculty'
import { University } from '@src/models/dbm/University'
import { User } from '@src/models/dbm/User'
import { INewFacultyDTM } from '@src/models/dtm/FacultyDTM'
import { INewUniversityDTM } from '@src/models/dtm/UniversityDTM'
import { INewUserDTM } from '@src/models/dtm/UserDTM'

export interface IConnector {
  createConnection: () => void
}

export default interface IDB {
  connector: IConnector
  users: IUsersRepository
  universities: IUniversitiesRepository
  faculties: IFacultiesRepository
}

export interface IUsersRepository {
  getList: () => Promise<IFuncResultModel<User[]>>
  getByID: (id: string) => Promise<IFuncResultModel<User>>
  create: (data: INewUserDTM) => Promise<IFuncResultModel<User>>
  update: (id: string, data: INewUserDTM) => Promise<IFuncResultModel<User>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
  getByLogin: (login: string) => Promise<IFuncResultModel<User>>
  checkLogin: (login: string) => Promise<IFuncResultModel<User | undefined>>
}
export interface IUniversitiesRepository {
  getList: () => Promise<IFuncResultModel<University[]>>
  getByID: (id: string) => Promise<IFuncResultModel<University>>
  create: (data: INewUniversityDTM) => Promise<IFuncResultModel<University>>
  update: (
    id: string,
    data: INewUniversityDTM
  ) => Promise<IFuncResultModel<University>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}
export interface IFacultiesRepository {
  getList: (universityId: string) => Promise<IFuncResultModel<Faculty[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Faculty>>
  create: (data: INewFacultyDTM) => Promise<IFuncResultModel<Faculty>>
  update: (
    id: string,
    data: INewFacultyDTM
  ) => Promise<IFuncResultModel<Faculty>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}
