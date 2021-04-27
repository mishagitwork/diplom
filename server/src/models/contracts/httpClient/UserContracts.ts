export interface INewUser {
  fullName: string
  birthday?: Date
  avatar?: string
  login: string
  password: string
  isAdmin?: boolean
}

export interface IUpdateUser extends INewUser {
  id: string
}
