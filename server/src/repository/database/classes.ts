import { Class } from '@models/dbm/Class'

import { IClassesRepository } from './interfaces'
import { INewClassDTM } from '@models/dtm/ClassDTM'

import DBConnector from '@src/repository/database/connector'

class ClassesRepository implements IClassesRepository {
  getList = async (data: { groupId?: string; professorId?: string }) => {
    try {
      const response = await DBConnector.connector?.getRepository(Class).find({
        relations: ['group', 'professor', 'subject'],
        where: { ...data },
      })

      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  getByID = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Class)
        .findOne(id)
      if (!response) return { error: new Error('not found') }
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  create = async (data: INewClassDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Class)
        .save(data)
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  update = async (id: string, data: INewClassDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Class)
        .update(id, data)
      return { value: response.raw }
    } catch (e) {
      return { error: e }
    }
  }

  delete = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Class)
        .delete(id)
      return { value: !!response.affected }
    } catch (e) {
      return { error: e }
    }
  }
}

export default new ClassesRepository()
