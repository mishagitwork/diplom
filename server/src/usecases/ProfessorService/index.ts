import R from '@repository'

import { IProfessorService } from '../layerInterfaces'

import {
  INewProfessor,
  IUpdateProfessor,
} from '@models/contracts/httpClient/ProfessorContracts'

class ProfessorService implements IProfessorService {
  getList = async (data: { facultyId: string }) => {
    const res = await R.db.professors.getList(data.facultyId)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getListByUniversity = async (data: { universityId: string }) => {
    const res = await R.db.professors.getListByUniversity(data.universityId)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getByID = async (id: string) => {
    const res = await R.db.professors.getByID(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  create = async (data: INewProfessor) => {
    const res = await R.db.professors.create(data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  update = async (data: IUpdateProfessor) => {
    const res = await R.db.professors.update(data.id, data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  delete = async (id: string) => {
    const res = await R.db.professors.delete(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
}

export default new ProfessorService()
