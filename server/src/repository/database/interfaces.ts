import { IFuncResultModel } from '@models/common/FuncResultModel'
import { User } from '@src/models/dbm/User'
import { INewUserDTM } from '@src/models/dtm/UserDTM'

export interface IConnector {
  createConnection: () => void
}

export default interface IDB {
  connector: IConnector
  users: IUsersRepository
}

export interface IUsersRepository {
  getList: () => Promise<IFuncResultModel<User[]>>
  getByID: (id: string) => Promise<IFuncResultModel<User>>
  create: (data: INewUserDTM) => Promise<IFuncResultModel<User>>
  update: (id: string, data: INewUserDTM) => Promise<IFuncResultModel<User>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
  login: (
    login: string,
    password: string
  ) => Promise<IFuncResultModel<User | undefined>>
  checkLogin: (login: string) => Promise<IFuncResultModel<User | undefined>>
}
