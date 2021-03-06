import connector from './connector'

import UserActions from './UserAction'
import AuthAction from './AuthAction'
import UniversityAction from './UniversityAction'
import FacultyAction from './FacultyAction'
import GroupAction from './GroupAction'
import StudentAction from './StudentAction'
import ProfessorAction from './ProfessorAction'
import SubjectAction from './SubjectAction'
import ClassAction from './ClassAction'
import AttendanceAction from './AttendanceAction'
import AnalyticAction from './AnalyticAction'

class DeliveryLayer {
  connector = connector
  UserActions = UserActions
  AuthAction = AuthAction
  UniversityAction = UniversityAction
  FacultyAction = FacultyAction
  GroupAction = GroupAction
  StudentAction = StudentAction
  ProfessorAction = ProfessorAction
  SubjectAction = SubjectAction
  ClassAction = ClassAction
  AttendanceAction = AttendanceAction
  AnalyticAction = AnalyticAction
}

export default new DeliveryLayer()
