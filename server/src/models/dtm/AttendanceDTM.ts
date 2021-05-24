export interface INewAttendanceDTM {
  classId: string
  expiredAt: Date
  studentId: string
}

export interface IUpdateByStudentAttendanceDTM {
  classId: string
  studentId: string
  coords: string
  isAttented: boolean
}
