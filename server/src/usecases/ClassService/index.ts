import R from '@repository'

import { IClassService } from '../layerInterfaces'

import {
  INewClass,
  IUpdateClass,
} from '@models/contracts/httpClient/ClassContracts'

class ClassService implements IClassService {
  getList = async (data: { groupId?: string; professorId?: string }) => {
    const res = await R.db.clases.getList(data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getByID = async (id: string) => {
    const res = await R.db.clases.getByID(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  create = async (data: INewClass) => {
    const res = await R.db.clases.create(data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  update = async (data: IUpdateClass) => {
    const res = await R.db.clases.update(data.id, data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  delete = async (id: string) => {
    const res = await R.db.clases.delete(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
}

export default new ClassService()
