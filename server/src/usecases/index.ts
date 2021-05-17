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
  IProfessorService,
  ISubjectService,
  IClassService,
  IJwtService,
  IAuthService,
} from './layerInterfaces'
import StudentService from './StudentService'
import ProfessorService from './ProfessorService'
import SubjectService from './SubjectService'
import ClassService from './ClassService'
import JwtService from './JwtService'
import AuthService from './AuthService'

class UseCases {
  userService: IUserService
  universityService: IUniversityService
  facultyService: IFacultyService
  groupService: IGroupService
  studentService: IStudentService
  professorService: IProfessorService
  subjectService: ISubjectService
  classService: IClassService
  jwtService: IJwtService
  authService: IAuthService
  constructor() {
    this.userService = UserService
    this.universityService = UniversityService
    this.facultyService = FacultyService
    this.groupService = GroupService
    this.studentService = StudentService
    this.professorService = ProfessorService
    this.subjectService = SubjectService
    this.classService = ClassService
    this.jwtService = JwtService
    this.authService = AuthService
  }
}

export default new UseCases()
