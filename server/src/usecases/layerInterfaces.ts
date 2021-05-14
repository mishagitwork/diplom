import { IFuncResultModel } from '@src/models/common/FuncResultModel'
import {
  INewClass,
  IUpdateClass,
} from '@src/models/contracts/httpClient/ClassContracts'
import {
  INewFaculty,
  IUpdateFaculty,
} from '@src/models/contracts/httpClient/FacultyContracts'
import {
  INewGroup,
  IUpdateGroup,
} from '@src/models/contracts/httpClient/GroupContracts'
import {
  INewProfessor,
  IUpdateProfessor,
} from '@src/models/contracts/httpClient/ProfessorContracts'
import {
  INewStudent,
  IUpdateStudent,
} from '@src/models/contracts/httpClient/StudentsContracts'
import {
  INewSubject,
  IUpdateSubject,
} from '@src/models/contracts/httpClient/SubjectContracts'
import {
  INewUniversity,
  IUpdateUniversity,
} from '@src/models/contracts/httpClient/UniversityContracts'
import {
  IAuthUser,
  INewUser,
  IUpdateUser,
} from '@src/models/contracts/httpClient/UserContracts'
import { Class } from '@src/models/dbm/Class'
import { Faculty } from '@src/models/dbm/Faculty'
import { Group } from '@src/models/dbm/Group'
import { Professor } from '@src/models/dbm/Professor'
import { Student } from '@src/models/dbm/Student'
import { Subject } from '@src/models/dbm/Subject'
import { University } from '@src/models/dbm/University'
import { User } from '@src/models/dbm/User'

export interface IUserService {
  getList: () => Promise<IFuncResultModel<User[]>>
  getByID: (id: string) => Promise<IFuncResultModel<User>>
  create: (data: INewUser) => Promise<IFuncResultModel<User>>
  update: (data: IUpdateUser) => Promise<IFuncResultModel<User>>
  login: (data: IAuthUser) => Promise<IFuncResultModel<User>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface IUniversityService {
  getList: () => Promise<IFuncResultModel<University[]>>
  getByID: (id: string) => Promise<IFuncResultModel<University>>
  create: (data: INewUniversity) => Promise<IFuncResultModel<University>>
  update: (data: IUpdateUniversity) => Promise<IFuncResultModel<University>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}
export interface IFacultyService {
  getList: (data: {
    universityId: string
  }) => Promise<IFuncResultModel<Faculty[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Faculty>>
  create: (data: INewFaculty) => Promise<IFuncResultModel<Faculty>>
  update: (data: IUpdateFaculty) => Promise<IFuncResultModel<Faculty>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface IGroupService {
  getList: (data: { facultyId: string }) => Promise<IFuncResultModel<Group[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Group>>
  create: (data: INewGroup) => Promise<IFuncResultModel<Group>>
  update: (data: IUpdateGroup) => Promise<IFuncResultModel<Group>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface IProfessorService {
  getList: (data: {
    facultyId: string
  }) => Promise<IFuncResultModel<Professor[]>>
  getListByUniversity: (data: {
    universityId: string
  }) => Promise<IFuncResultModel<Professor[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Professor>>
  create: (data: INewProfessor) => Promise<IFuncResultModel<Professor>>
  update: (data: IUpdateProfessor) => Promise<IFuncResultModel<Professor>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface IStudentService {
  getList: (data: { groupId: string }) => Promise<IFuncResultModel<Student[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Student>>
  create: (data: INewStudent) => Promise<IFuncResultModel<Student>>
  update: (data: IUpdateStudent) => Promise<IFuncResultModel<Student>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface ISubjectService {
  getList: (data: {
    universityId: string
  }) => Promise<IFuncResultModel<Subject[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Subject>>
  create: (data: INewSubject) => Promise<IFuncResultModel<Subject>>
  update: (data: IUpdateSubject) => Promise<IFuncResultModel<Subject>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}

export interface IClassService {
  getList: (data: { groupId: string }) => Promise<IFuncResultModel<Class[]>>
  getByID: (id: string) => Promise<IFuncResultModel<Class>>
  create: (data: INewClass) => Promise<IFuncResultModel<Class>>
  update: (data: IUpdateClass) => Promise<IFuncResultModel<Class>>
  delete: (id: string) => Promise<IFuncResultModel<boolean>>
}
