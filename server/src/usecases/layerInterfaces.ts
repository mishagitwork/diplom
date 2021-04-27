import { IFuncResultModel } from '@src/models/common/FuncResultModel'
import {
  INewUser,
  IUpdateUser,
} from '@src/models/contracts/httpClient/UserContracts'
import { User } from '@src/models/dbm/User'

export interface IUserService {
  getList: () => Promise<IFuncResultModel<User[]>>
  getByID: (id: string) => Promise<IFuncResultModel<User>>
  create: (data: INewUser) => Promise<IFuncResultModel<User>>
  update: (data: IUpdateUser) => Promise<IFuncResultModel<User>>
  login: (data: {
    login: string
    password: string
  }) => Promise<IFuncResultModel<User | undefined>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}
