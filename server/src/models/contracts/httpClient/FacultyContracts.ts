export interface INewFaculty {
  fullName: string
  shortName: string
  universityId: string
}

export interface IUpdateFaculty extends INewFaculty {
  id: string
}
