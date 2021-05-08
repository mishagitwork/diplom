import R from '@repository'

import { IGroupService } from '../layerInterfaces'

import {
  INewGroup,
  IUpdateGroup,
} from '@models/contracts/httpClient/GroupContracts'

class GroupService implements IGroupService {
  getList = async (data: { facultyId: string }) => {
    const res = await R.db.groups.getList(data.facultyId)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getByID = async (id: string) => {
    const res = await R.db.groups.getByID(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  create = async (data: INewGroup) => {
    const res = await R.db.groups.create(data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  update = async (data: IUpdateGroup) => {
    const res = await R.db.groups.update(data.id, data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  delete = async (id: string) => {
    const res = await R.db.groups.delete(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
}

export default new GroupService()
