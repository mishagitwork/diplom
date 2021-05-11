import { Student } from '@models/dbm/Student'

import { IStudentsRepository } from './interfaces'
import { INewStudentDTM } from '@models/dtm/StudentDTM'

import DBConnector from '@src/repository/database/connector'
import { User } from '@src/models/dbm/User'

class StudentsRepository implements IStudentsRepository {
  getList = async (groupId: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Student)
        .find({ where: { groupId }, relations: ['user'] })
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  getByID = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Student)
        .findOne(id)
      if (!response) return { error: new Error('not found') }
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  create = async (data: INewStudentDTM) => {
    try {
      const user = new User()
      Object.assign(user, data.user)

      const response = await DBConnector.connector
        ?.getRepository(Student)
        .save({ ...data, user })
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  update = async (id: string, data: INewStudentDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Student)
        .update(id, data)
      return { value: response.raw }
    } catch (e) {
      return { error: e }
    }
  }

  delete = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Student)
        .delete(id)
      return { value: !!response.affected }
    } catch (e) {
      return { error: e }
    }
  }
}

export default new StudentsRepository()
