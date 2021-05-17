import UC from '@useCases'
import R from '@repository'
import { IAuthService } from '../layerInterfaces'

class AuthService implements IAuthService {
  login = async (data: { login: string; password: string }) => {
    const user = await R.db.users.getByLogin(data.login)
    if (user.error || !(await user.value.verifyPassword(data.password))) {
      return { error: user.error || new Error('Invalid credentials') }
    }

    const tokens = await UC.jwtService.generateTokens({
      userId: user.value.id,
      fullName: user.value.fullName,
      universityId: user.value.university?.id,
      professorId: user.value.professor?.id,
      studentId: user.value.student?.id,
      isMonitor: user.value.student?.isMonitor,
      isAdmin: user.value.isAdmin,
    })
    if (tokens.error) return { error: tokens.error }
    return { value: tokens.value }
  }

  refresh = async (token: string) => {
    const decoded = await UC.jwtService.verify(token)
    if (decoded.error || !decoded.value) {
      return { error: new Error('JWT not founded') }
    }
    const user = await UC.userService.getByID(decoded.id)
    if (user.error || !user.value) {
      return { error: new Error('User not founded') }
    }

    const tokens = await UC.jwtService.generateTokens({
      userId: user.value.id,
      fullName: user.value.fullName,
      universityId: user.value.university?.id,
      professorId: user.value.professor?.id,
      studentId: user.value.student?.id,
      isMonitor: user.value.student?.isMonitor,
      isAdmin: user.value.isAdmin,
    })
    if (tokens.error) return { error: tokens.error }
    return { value: tokens.value }
  }
}

export default new AuthService()
