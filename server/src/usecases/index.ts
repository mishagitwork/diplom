import UserService from './UserService'
import UniversityService from './UniversityService'
import FacultyService from './FacultyService'

import {
  IFacultyService,
  IUniversityService,
  IUserService,
} from './layerInterfaces'

class UseCases {
  userService: IUserService
  universityService: IUniversityService
  facultyService: IFacultyService
  constructor() {
    this.userService = UserService
    this.universityService = UniversityService
    this.facultyService = FacultyService
  }
}

export default new UseCases()
