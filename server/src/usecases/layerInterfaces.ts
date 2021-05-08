import { IFuncResultModel } from '@src/models/common/FuncResultModel'
import {
  INewFaculty,
  IUpdateFaculty,
} from '@src/models/contracts/httpClient/FacultyContracts'
import {
  INewGroup,
  IUpdateGroup,
} from '@src/models/contracts/httpClient/GroupContracts'
import {
  INewUniversity,
  IUpdateUniversity,
} from '@src/models/contracts/httpClient/UniversityContracts'
import {
  IAuthUser,
  INewUser,
  IUpdateUser,
} from '@src/models/contracts/httpClient/UserContracts'
import { Faculty } from '@src/models/dbm/Faculty'
import { Group } from '@src/models/dbm/Group'
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
