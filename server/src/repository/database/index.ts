import connector from './connector'
import UsersRepository from './users'
import UniversitiesRepository from './university'
import FacultiesRepository from './faculty'
import GroupsRepository from './groups'
import StudentsRepository from './students'
import ProfessorsRepository from './professors'
import SubjectsRepository from './subjects'

import IDB, {
  IConnector,
  IFacultiesRepository,
  IGroupsRepository,
  IUniversitiesRepository,
  IUsersRepository,
  IStudentsRepository,
  IProfessorsRepository,
  ISubjectsRepository,
} from './interfaces'

class DB implements IDB {
  connector: IConnector
  users: IUsersRepository
  universities: IUniversitiesRepository
  faculties: IFacultiesRepository
  groups: IGroupsRepository
  students: IStudentsRepository
  professors: IProfessorsRepository
  subjects: ISubjectsRepository
  constructor() {
    this.connector = connector
    this.users = UsersRepository
    this.universities = UniversitiesRepository
    this.faculties = FacultiesRepository
    this.groups = GroupsRepository
    this.students = StudentsRepository
    this.professors = ProfessorsRepository
    this.subjects = SubjectsRepository
  }
}

export default new DB()
