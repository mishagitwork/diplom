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
} from './layerInterfaces'
import StudentService from './StudentService'
import ProfessorService from './ProfessorService'
import SubjectService from './SubjectService'

class UseCases {
  userService: IUserService
  universityService: IUniversityService
  facultyService: IFacultyService
  groupService: IGroupService
  studentService: IStudentService
  professorService: IProfessorService
  subjectService: ISubjectService
  constructor() {
    this.userService = UserService
    this.universityService = UniversityService
    this.facultyService = FacultyService
    this.groupService = GroupService
    this.studentService = StudentService
    this.professorService = ProfessorService
    this.subjectService = SubjectService
  }
}

export default new UseCases()
