import { IFuncResultModel } from '@models/common/FuncResultModel'
import { Faculty } from '@src/models/dbm/Faculty'
import { Group } from '@src/models/dbm/Group'
import { Student } from '@src/models/dbm/Student'
import { University } from '@src/models/dbm/University'
import { User } from '@src/models/dbm/User'
import { INewFacultyDTM } from '@src/models/dtm/FacultyDTM'
import { INewGroupDTM } from '@src/models/dtm/GroupDTM'
import { INewStudentDTM } from '@src/models/dtm/StudentDTM'
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
