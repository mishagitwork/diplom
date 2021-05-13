export interface INewSubject {
  fullName: string
  shortName: string
  universityId: string
}

export interface IUpdateSubject extends INewSubject {
  id: string
}
