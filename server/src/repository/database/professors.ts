import { Professor } from '@models/dbm/Professor'

import { IProfessorsRepository } from './interfaces'
import { INewProfessorDTM } from '@models/dtm/ProfessorDTM'

import DBConnector from '@src/repository/database/connector'
import { User } from '@src/models/dbm/User'

class ProfessorsRepository implements IProfessorsRepository {
  getList = async (facultyId: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Professor)
        .find({ where: { facultyId }, relations: ['user'] })
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  getListByUniversity = async (universityId: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Professor)
        .find({
          join: {
            alias: 'professors',
            innerJoin: { faculty: 'professors.faculty' },
          },
          relations: ['user'],

          where: (qb: any) => {
            qb.where('faculty.universityId = :universityId', {
              universityId,
            })
          },
        })

      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  getByID = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Professor)
        .findOne(id)
      if (!response) return { error: new Error('not found') }
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  create = async (data: INewProfessorDTM) => {
    try {
      const user = new User()
      Object.assign(user, data.user)

      const response = await DBConnector.connector
        ?.getRepository(Professor)
        .save({ ...data, user })
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  update = async (id: string, data: INewProfessorDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Professor)
        .update(id, data)
      return { value: response.raw }
    } catch (e) {
      return { error: e }
    }
  }

  delete = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Professor)
        .delete(id)
      return { value: !!response.affected }
    } catch (e) {
      return { error: e }
    }
  }
}

export default new ProfessorsRepository()
