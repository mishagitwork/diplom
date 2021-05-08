import connector from './connector'

import UserActions from './UserAction'
import AuthAction from './AuthAction'
import UniversityAction from './UniversityAction'
import FacultyAction from './FacultyAction'
import GroupAction from './GroupAction'

class DeliveryLayer {
  connector = connector
  UserActions = UserActions
  AuthAction = AuthAction
  UniversityAction = UniversityAction
  FacultyAction = FacultyAction
  GroupAction = GroupAction
}

export default new DeliveryLayer()
