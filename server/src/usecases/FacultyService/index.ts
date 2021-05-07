import R from '@repository'

import { IFacultyService } from '../layerInterfaces'

import {
  INewFaculty,
  IUpdateFaculty,
} from '@models/contracts/httpClient/FacultyContracts'

class FacultyService implements IFacultyService {
  getList = async (data: { universityId: string }) => {
    const res = await R.db.faculties.getList(data.universityId)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getByID = async (id: string) => {
    const res = await R.db.faculties.getByID(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  create = async (data: INewFaculty) => {
    const res = await R.db.faculties.create(data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  update = async (data: IUpdateFaculty) => {
    const res = await R.db.faculties.update(data.id, data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  delete = async (id: string) => {
    const res = await R.db.faculties.delete(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
}

export default new FacultyService()
