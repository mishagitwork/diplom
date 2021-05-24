import { Attendance } from '@models/dbm/Attendance'

import { IAttendancesRepository } from './interfaces'
import {
  INewAttendanceDTM,
  IUpdateByStudentAttendanceDTM,
} from '@models/dtm/AttendanceDTM'

import DBConnector from '@src/repository/database/connector'
import { FindManyOptions, Raw } from 'typeorm'

class AttendancesRepository implements IAttendancesRepository {
  getList = async (data: { classId?: string; expiredAt?: Date }) => {
    try {
      let options: FindManyOptions = { where: { ...data } }
      if (data.expiredAt) {
        options = { ...options, relations: ['student'] }
      }
      const response = await DBConnector.connector
        ?.getRepository(Attendance)
        .find(options)
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  getByID = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Attendance)
        .findOne(id)
      if (!response) return { error: new Error('not found') }
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  create = async (data: INewAttendanceDTM[]) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Attendance)
        .save(data)
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  update = async (id: string, data: INewAttendanceDTM) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Attendance)
        .update(id, data)
      return { value: response.raw }
    } catch (e) {
      return { error: e }
    }
  }

  updateByStudent = async (data: IUpdateByStudentAttendanceDTM) => {
    try {
      const attendance = await DBConnector.connector
        ?.getRepository(Attendance)
        .findOne({
          where: {
            classId: data.classId,
            studentId: data.studentId,
            expiredAt: Raw(
              (alias) => `${alias} >= '${new Date().toISOString()}'`
            ),
          },
        })

      if (!attendance) return { error: new Error('Attendance not exist') }

      attendance.isAttended = data.isAttented
      attendance.coords = data.coords
      const response = await DBConnector.connector
        ?.getRepository(Attendance)
        .save(attendance)
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }

  delete = async (id: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Attendance)
        .delete(id)
      return { value: !!response.affected }
    } catch (e) {
      return { error: e }
    }
  }
  count = async (studentId: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Attendance)
        .createQueryBuilder('attendance')
        .where('attendance.studentId = :studentId', {
          studentId: studentId,
        })
        .select('attendance."isAttended" AS "isAttended"')
        .addSelect('COUNT(*) AS count')
        .groupBy('attendance."isAttended"')
        .getRawMany()
      console.log(response)
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }
  countByClassAttended = async (studentId: string) => {
    try {
      const response = await DBConnector.connector
        ?.getRepository(Attendance)
        .createQueryBuilder('attendance')
        .where('attendance.studentId = :studentId', {
          studentId: studentId,
        })
        .leftJoinAndSelect('attendance.class', 'class')
        .leftJoinAndSelect('class.subject', 'subject')
        .select('subject."shortName" AS "shortName"')
        .addSelect('COUNT(*) AS "countAll"')
        .addSelect(
          'COUNT(*) FILTER (WHERE attendance."isAttended" = false) AS "countMiss"'
        )
        .addSelect(
          'COUNT(*) FILTER (WHERE attendance."isAttended" = true) AS "countPass"'
        )
        .groupBy('subject.shortName')
        .getRawMany()
      return { value: response }
    } catch (e) {
      return { error: e }
    }
  }
}

export default new AttendancesRepository()
