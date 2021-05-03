import { IFuncResultModel } from '@models/common/FuncResultModel'
import { University } from '@src/models/dbm/University'
import { User } from '@src/models/dbm/User'
import { INewUniversityDTM } from '@src/models/dtm/UniversityDTM'
import { INewUserDTM } from '@src/models/dtm/UserDTM'

export interface IConnector {
  createConnection: () => void
}

export default interface IDB {
  connector: IConnector
  users: IUsersRepository
  universities: IUniversitiesRepository
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
