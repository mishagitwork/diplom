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
  IAttendanceService,
  IAnalysticService,
} from './layerInterfaces'
import StudentService from './StudentService'
import ProfessorService from './ProfessorService'
import SubjectService from './SubjectService'
import ClassService from './ClassService'
import JwtService from './JwtService'
import AuthService from './AuthService'
import AttendanceService from './AttendanceService'
import AnalysticService from './AnalyticService'

class UseCases {
  userService: IUserService
  universityService: IUniversityService
  facultyService: IFacultyService
  groupService: IGroupService
  studentService: IStudentService
  professorService: IProfessorService
  subjectService: ISubjectService
  classService: IClassService
  attendanceService: IAttendanceService
  jwtService: IJwtService
  authService: IAuthService
  analyticService: IAnalysticService
  constructor() {
    this.userService = UserService
    this.universityService = UniversityService
    this.facultyService = FacultyService
    this.groupService = GroupService
    this.studentService = StudentService
    this.professorService = ProfessorService
    this.subjectService = SubjectService
    this.classService = ClassService
    this.attendanceService = AttendanceService
    this.jwtService = JwtService
    this.authService = AuthService
    this.analyticService = AnalysticService
  }
}

export default new UseCases()
