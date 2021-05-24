import R from '@repository'

import { IUniversityService } from '../layerInterfaces'

import {
  INewUniversity,
  IUpdateUniversity,
} from '@models/contracts/httpClient/UniversityContracts'

class UniversityService implements IUniversityService {
  getList = async () => {
    const res = await R.db.universities.getList()

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getByID = async (id: string) => {
    const res = await R.db.universities.getByID(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  create = async (data: INewUniversity) => {
    const res = await R.db.universities.create(data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  update = async (data: IUpdateUniversity) => {
    const res = await R.db.universities.update(data.id, data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  delete = async (id: string) => {
    const res = await R.db.universities.delete(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
}

export default new UniversityService()
