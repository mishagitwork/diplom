export interface INewClass {
  groupId: string
  professorId: string
  subjectId: string
}

export interface IUpdateClass extends INewClass {
  id: string
}
