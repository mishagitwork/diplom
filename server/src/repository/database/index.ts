import connector from './connector'
import UsersRepository from './users'
import UniversitiesRepository from './university'
import FacultiesRepository from './faculty'
import GroupsRepository from './groups'

import IDB, {
  IConnector,
  IFacultiesRepository,
  IGroupsRepository,
  IUniversitiesRepository,
  IUsersRepository,
} from './interfaces'

class DB implements IDB {
  connector: IConnector
  users: IUsersRepository
  universities: IUniversitiesRepository
  faculties: IFacultiesRepository
  groups: IGroupsRepository
  constructor() {
    this.connector = connector
    this.users = UsersRepository
    this.universities = UniversitiesRepository
    this.faculties = FacultiesRepository
    this.groups = GroupsRepository
  }
}

export default new DB()
