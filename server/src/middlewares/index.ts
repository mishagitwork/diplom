import ExecJWT from './execJWT'

class Middleware {
  executeJWT: any

  constructor() {
    this.executeJWT = ExecJWT
  }
}

export default new Middleware()
