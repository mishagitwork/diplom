import { University } from '@models/dbm/University'

import { IUniversitiesRepository } from './interfaces'
import { INewUniversityDTM } from '@models/dtm/UniversityDTM'

import DBConnector from '@src/repository/database/connector'
import { User } from '@src/models/dbm/User'

class UniversitiesRepository implements IUniversitiesRepository {
  getList = async () => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(University)
        .find()
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  getByID = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(University)
        .findOne(id)
      if (!response) return { error: new Error('not found') }
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  create = async (data: INewUniversityDTM) => {
    try {
      const user = new User()
      Object.assign(user, data.user)

      const response = await DBConnector.connector
        ?.getRepository(University)
        .save({ ...data, user })
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  update = async (id: string, data: INewUniversityDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(University)
        .update(id, data)
      return { value: response.raw }
    } catch (e) {
      return { error: e }
    }
  }

  delete = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(University)
        .delete(id)
      return { value: !!response.affected }
    } catch (e) {
      return { error: e }
    }
  }
}

export default new UniversitiesRepository()
