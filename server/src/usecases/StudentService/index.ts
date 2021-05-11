import R from '@repository'

import { IStudentService } from '../layerInterfaces'

import {
  INewStudent,
  IUpdateStudent,
} from '@models/contracts/httpClient/StudentsContracts'

class StudentService implements IStudentService {
  getList = async (data: { groupId: string }) => {
    const res = await R.db.students.getList(data.groupId)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getByID = async (id: string) => {
    const res = await R.db.students.getByID(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  create = async (data: INewStudent) => {
    const res = await R.db.students.create(data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  update = async (data: IUpdateStudent) => {
    const res = await R.db.students.update(data.id, data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  delete = async (id: string) => {
    const res = await R.db.universities.delete(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
}

export default new StudentService()
