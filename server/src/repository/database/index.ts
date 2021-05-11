import connector from './connector'
import UsersRepository from './users'
import UniversitiesRepository from './university'
import FacultiesRepository from './faculty'
import GroupsRepository from './groups'
import StudentsRepository from './students'

import IDB, {
  IConnector,
  IFacultiesRepository,
  IGroupsRepository,
  IUniversitiesRepository,
  IUsersRepository,
  IStudentsRepository,
} from './interfaces'

class DB implements IDB {
  connector: IConnector
  users: IUsersRepository
  universities: IUniversitiesRepository
  faculties: IFacultiesRepository
  groups: IGroupsRepository
  students: IStudentsRepository
  constructor() {
    this.connector = connector
    this.users = UsersRepository
    this.universities = UniversitiesRepository
    this.faculties = FacultiesRepository
    this.groups = GroupsRepository
    this.students = StudentsRepository
  }
}

export default new DB()
