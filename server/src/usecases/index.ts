import UserService from './UserService'
import UniversityService from './UniversityService'
import FacultyService from './FacultyService'
import GroupService from './GroupService'

import {
  IFacultyService,
  IUniversityService,
  IUserService,
  IGroupService,
  IStudentService,
} from './layerInterfaces'
import StudentService from './StudentService'

class UseCases {
  userService: IUserService
  universityService: IUniversityService
  facultyService: IFacultyService
  groupService: IGroupService
  studentService: IStudentService
  constructor() {
    this.userService = UserService
    this.universityService = UniversityService
    this.facultyService = FacultyService
    this.groupService = GroupService
    this.studentService = StudentService
  }
}

export default new UseCases()
