import UserService from './UserService'
import UniversityService from './UniversityService'
import FacultyService from './FacultyService'
import GroupService from './GroupService'

import {
  IFacultyService,
  IUniversityService,
  IUserService,
  IGroupService,
} from './layerInterfaces'

class UseCases {
  userService: IUserService
  universityService: IUniversityService
  facultyService: IFacultyService
  groupService: IGroupService
  constructor() {
    this.userService = UserService
    this.universityService = UniversityService
    this.facultyService = FacultyService
    this.groupService = GroupService
  }
}

export default new UseCases()
