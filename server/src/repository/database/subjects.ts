import { Subject } from '@models/dbm/Subject'

import { ISubjectsRepository } from './interfaces'
import { INewSubjectDTM } from '@models/dtm/SubjectDTM'

import DBConnector from '@src/repository/database/connector'

class SubjectsRepository implements ISubjectsRepository {
  getList = async (universityId: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Subject)
        .find({ where: { universityId } })
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  getByID = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Subject)
        .findOne(id)
      if (!response) return { error: new Error('not found') }
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  create = async (data: INewSubjectDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Subject)
        .save(data)

      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  update = async (id: string, data: INewSubjectDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Subject)
        .update(id, data)
      return { value: response.raw }
    } catch (e) {
      return { error: e }
    }
  }

  delete = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Subject)
        .delete(id)
      return { value: !!response.affected }
    } catch (e) {
      return { error: e }
    }
  }
}

export default new SubjectsRepository()
