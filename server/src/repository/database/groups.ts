import { Group } from '@models/dbm/Group'

import { IGroupsRepository } from './interfaces'
import { INewGroupDTM } from '@models/dtm/GroupDTM'

import DBConnector from '@src/repository/database/connector'

class GroupsRepository implements IGroupsRepository {
  getList = async (facultyId: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Group)
        .find({ where: { facultyId } })
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  getByID = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Group)
        .findOne(id)
      if (!response) return { error: new Error('not found') }
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  create = async (data: INewGroupDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Group)
        .save(data)

      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  update = async (id: string, data: INewGroupDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Group)
        .update(id, data)
      return { value: response.raw }
    } catch (e) {
      return { error: e }
    }
  }

  delete = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Group)
        .delete(id)
      return { value: !!response.affected }
    } catch (e) {
      return { error: e }
    }
  }
}

export default new GroupsRepository()
