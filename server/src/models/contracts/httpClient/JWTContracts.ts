export interface INewJWTTokens {
  userId: string
  fullName: string
  universityId: string
  professorId: string
  studentId: string
  groupId: string
  isMonitor: boolean
  isAdmin: boolean
}
export interface INewJWTToken extends INewJWTTokens {
  expiresIn: string
}
export interface IJWTResponse {
  accessToken: string
  refreshToken: string
  expiresIn: Date
}
