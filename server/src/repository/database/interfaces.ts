import { IFuncResultModel } from '@models/common/FuncResultModel'
import { Attendance } from '@src/models/dbm/Attendance'
import { Class } from '@src/models/dbm/Class'
import { Faculty } from '@src/models/dbm/Faculty'
import { Group } from '@src/models/dbm/Group'
import { Professor } from '@src/models/dbm/Professor'
import { Student } from '@src/models/dbm/Student'
import { Subject } from '@src/models/dbm/Subject'
import { University } from '@src/models/dbm/University'
import { User } from '@src/models/dbm/User'
import {
  INewAttendanceDTM,
  IUpdateByStudentAttendanceDTM,
} from '@src/models/dtm/AttendanceDTM'
import { INewClassDTM } from '@src/models/dtm/ClassDTM'
import { INewFacultyDTM } from '@src/models/dtm/FacultyDTM'
import { INewGroupDTM } from '@src/models/dtm/GroupDTM'
import { INewProfessorDTM } from '@src/models/dtm/ProfessorDTM'
import { INewStudentDTM } from '@src/models/dtm/StudentDTM'
import { INewSubjectDTM } from '@src/models/dtm/SubjectDTM'
import { INewUniversityDTM } from '@src/models/dtm/UniversityDTM'
import { INewUserDTM } from '@src/models/dtm/UserDTM'

export interface IConnector {
  createConnection: () => void
}

export default interface IDB {
  connector: IConnector
  users: IUsersRepository
  universities: IUniversitiesRepository
  faculties: IFacultiesRepository
  groups: IGroupsRepository
  students: IStudentsRepository
  professors: IProfessorsRepository
  subjects: ISubjectsRepository
  clases: IClassesRepository
  attendance: IAttendancesRepository
}

export interface IUsersRepository {
  getList: () => Promise<IFuncResultModel<User[]>>
  getByID: (id: string) => Promise<IFuncResultModel<User>>
  create: (data: INewUserDTM) => Promise<IFuncResultModel<User>>
  update: (id: string, data: INewUserDTM) => Promise<IFuncResultModel<User>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
  getByLogin: (login: string) => Promise<IFuncResultModel<User>>
  checkLogin: (login: string) => Promise<IFuncResultModel<User | undefined>>
}
export interface IUniversitiesRepository {
  getList: () => Promise<IFuncResultModel<University[]>>
  getByID: (id: string) => Promise<IFuncResultModel<University>>
  create: (data: INewUniversityDTM) => Promise<IFuncResultModel<University>>
  update: (
    id: string,
    data: INewUniversityDTM
  ) => Promise<IFuncResultModel<University>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}
export interface IFacultiesRepository {
  getList: (universityId: string) => Promise<IFuncResultModel<Faculty[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Faculty>>
  create: (data: INewFacultyDTM) => Promise<IFuncResultModel<Faculty>>
  update: (
    id: string,
    data: INewFacultyDTM
  ) => Promise<IFuncResultModel<Faculty>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}
export interface IGroupsRepository {
  getList: (facultyId: string) => Promise<IFuncResultModel<Group[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Group>>
  create: (data: INewGroupDTM) => Promise<IFuncResultModel<Group>>
  update: (id: string, data: INewGroupDTM) => Promise<IFuncResultModel<Group>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface IProfessorsRepository {
  getList: (facultyId: string) => Promise<IFuncResultModel<Professor[]>>
  getListByUniversity: (
    universityId: string
  ) => Promise<IFuncResultModel<Professor[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Professor>>
  create: (data: INewProfessorDTM) => Promise<IFuncResultModel<Professor>>
  update: (
    id: string,
    data: INewProfessorDTM
  ) => Promise<IFuncResultModel<Professor>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface IStudentsRepository {
  getList: (groupId: string) => Promise<IFuncResultModel<Student[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Student>>
  create: (data: INewStudentDTM) => Promise<IFuncResultModel<Student>>
  update: (
    id: string,
    data: INewStudentDTM
  ) => Promise<IFuncResultModel<Student>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface ISubjectsRepository {
  getList: (universityId: string) => Promise<IFuncResultModel<Subject[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Subject>>
  create: (data: INewSubjectDTM) => Promise<IFuncResultModel<Subject>>
  update: (
    id: string,
    data: INewSubjectDTM
  ) => Promise<IFuncResultModel<Subject>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface IClassesRepository {
  getList: (data: {
    groupId?: string
    professorId?: string
  }) => Promise<IFuncResultModel<Class[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Class>>
  create: (data: INewClassDTM) => Promise<IFuncResultModel<Class>>
  update: (id: string, data: INewClassDTM) => Promise<IFuncResultModel<Class>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface IAttendancesRepository {
  getList: (data: {
    classId?: string
    expiredAt?: Date
    studentId?: string
  }) => Promise<IFuncResultModel<Attendance[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Attendance>>
  create: (data: INewAttendanceDTM[]) => Promise<IFuncResultModel<Attendance[]>>
  update: (id: string, data: any) => Promise<IFuncResultModel<Attendance>>
  updateByStudent: (
    data: IUpdateByStudentAttendanceDTM
  ) => Promise<IFuncResultModel<Attendance>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
  count: (
    studentId: string
  ) => Promise<IFuncResultModel<{ isAttended: boolean; count: number }[]>>
  countByClassAttended: (
    studentId: string
  ) => Promise<IFuncResultModel<{ shortName: string; count: number }[]>>
}
