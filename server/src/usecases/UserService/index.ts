import R from '@repository'

import { IUserService } from '../layerInterfaces'

import {
  IAuthUser,
  INewUser,
  IUpdateUser,
} from '@models/contracts/httpClient/UserContracts'

class UserService implements IUserService {
  getList = async () => {
    const res = await R.db.users.getList()

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getByID = async (id: string) => {
    const res = await R.db.users.getByID(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  create = async (data: INewUser) => {
    const exist = await R.db.users.getByLogin(data.login)
    if (!exist.value) {
      const res = await R.db.users.create(data)

      if (res.error) return { error: res.error }
      return { value: res.value }
    } else return { error: new Error('User Exists') }
  }

  update = async (data: IUpdateUser) => {
    const res = await R.db.users.update(data.id, data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  login = async (data: IAuthUser) => {
    const res = await R.db.users.getByLogin(data.login)

    if (res.error) return { error: res.error }
    if (!res.value.verifyPassword(data.password))
      return { error: new Error('Incorect Password') }
    return { value: res.value }
  }

  delete = async (id: string) => {
    const res = await R.db.users.delete(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
}

export default new UserService()
