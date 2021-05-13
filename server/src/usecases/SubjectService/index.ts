import R from '@repository'

import { ISubjectService } from '../layerInterfaces'

import {
  INewSubject,
  IUpdateSubject,
} from '@models/contracts/httpClient/SubjectContracts'

class SubjectService implements ISubjectService {
  getList = async (data: { universityId: string }) => {
    const res = await R.db.subjects.getList(data.universityId)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getByID = async (id: string) => {
    const res = await R.db.subjects.getByID(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  create = async (data: INewSubject) => {
    const res = await R.db.subjects.create(data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  update = async (data: IUpdateSubject) => {
    const res = await R.db.subjects.update(data.id, data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  delete = async (id: string) => {
    const res = await R.db.subjects.delete(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
}

export default new SubjectService()
