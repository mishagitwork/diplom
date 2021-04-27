import UserService from './UserService'
import UniversityService from './UniversityService'

import { IUniversityService, IUserService } from './layerInterfaces'

class UseCases {
  userService: IUserService
  universityService: IUniversityService
  constructor() {
    this.userService = UserService
    this.universityService = this.universityService
  }
}

export default new UseCases()
