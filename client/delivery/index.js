import connector from './connector'

import UserActions from './UserAction'
import AuthAction from './AuthAction'
import UniversityAction from './UniversityAction'

class DeliveryLayer {
  connector = connector
  UserActions = UserActions
  AuthAction = AuthAction
  UniversityAction = UniversityAction
}

export default new DeliveryLayer()
