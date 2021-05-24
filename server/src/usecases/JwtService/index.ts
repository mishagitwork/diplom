const jwt = require('jsonwebtoken')
import {
  INewJWTToken,
  INewJWTTokens,
} from '@src/models/contracts/httpClient/JWTContracts'
import Config from '@src/repository/config'
import { IJwtService } from '../layerInterfaces'

class JwtService implements IJwtService {
  async generateToken(data: INewJWTToken) {
    try {
      const token = await jwt.sign(data, Config.config.JWT_TOKEN_SECRET, {
        expiresIn: data.expiresIn,
      })
      return { value: token }
    } catch (err) {
      return { error: err }
    }
  }

  async generateTokens(data: INewJWTTokens) {
    const accessToken = await this.generateToken({ ...data, expiresIn: '6m' })
    const refreshToken = await this.generateToken({ ...data, expiresIn: '2d' })

    if (accessToken.error || refreshToken.error)
      return { error: new Error('Tokens were not created') }
    return {
      value: {
        accessToken: accessToken.value,
        refreshToken: refreshToken.value,
        expiresIn: jwt.decode(accessToken.value).exp,
      },
    }
  }

  async verify(token: string) {
    try {
      const decoded = jwt.verify(token, Config.config.JWT_TOKEN_SECRET)
      return { value: { ...decoded } }
    } catch (err) {
      return { error: err }
    }
  }
}

export default new JwtService()
