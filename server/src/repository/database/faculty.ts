import { Faculty } from '@models/dbm/Faculty'

import { IFacultiesRepository } from './interfaces'
import { INewFacultyDTM } from '@models/dtm/FacultyDTM'

import DBConnector from '@src/repository/database/connector'

class FacultiesRepository implements IFacultiesRepository {
  getList = async (universityId: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Faculty)
        .find({ where: { universityId } })
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  getByID = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Faculty)
        .findOne(id)
      if (!response) return { error: new Error('not found') }
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  create = async (data: INewFacultyDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Faculty)
        .save(data)

      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  update = async (id: string, data: INewFacultyDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Faculty)
        .update(id, data)
      return { value: response.raw }
    } catch (e) {
      return { error: e }
    }
  }

  delete = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Faculty)
        .delete(id)
      return { value: !!response.affected }
    } catch (e) {
      return { error: e }
    }
  }
}

export default new FacultiesRepository()
