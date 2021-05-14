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
} from './layerInterfaces'
import StudentService from './StudentService'
import ProfessorService from './ProfessorService'
import SubjectService from './SubjectService'
import ClassService from './ClassService'

class UseCases {
  userService: IUserService
  universityService: IUniversityService
  facultyService: IFacultyService
  groupService: IGroupService
  studentService: IStudentService
  professorService: IProfessorService
  subjectService: ISubjectService
  classService: IClassService
  constructor() {
    this.userService = UserService
    this.universityService = UniversityService
    this.facultyService = FacultyService
    this.groupService = GroupService
    this.studentService = StudentService
    this.professorService = ProfessorService
    this.subjectService = SubjectService
    this.classService = ClassService
  }
}

export default new UseCases()
