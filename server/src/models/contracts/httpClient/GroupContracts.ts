export interface INewGroup {
  fullName: string
  shortName: string
  graduationDate: Date
  facultyId: string
}

export interface IUpdateGroup extends INewGroup {
  id: string
}
