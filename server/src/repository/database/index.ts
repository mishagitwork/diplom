import connector from './connector'
import UsersRepository from './users'
import UniversitiesRepository from './university'

import IDB, {
  IConnector,
  IUniversitiesRepository,
  IUsersRepository,
} from './interfaces'

class DB implements IDB {
  connector: IConnector
  users: IUsersRepository
  universities: IUniversitiesRepository
  constructor() {
    this.connector = connector
    this.users = UsersRepository
    this.universities = UniversitiesRepository
  }
}

export default new DB()
