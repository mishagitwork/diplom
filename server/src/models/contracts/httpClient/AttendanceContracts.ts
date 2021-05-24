export interface INewAttendance {
  classId: string
  expiredAt: Date
  students?: string[]
}

export interface IUpdateAttendance extends INewAttendance {
  id: string
}

export interface IUpdateByStudentAttendance {
  classId: string
  studentId: string
  coords: { latitude: number; longitude: number }
}
