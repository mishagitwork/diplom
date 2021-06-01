import R from '@repository'

import { IAttendanceService } from '../layerInterfaces'

import {
  INewAttendance,
  IUpdateAttendance,
  IUpdateByStudentAttendance,
} from '@models/contracts/httpClient/AttendanceContracts'
import { INewAttendanceDTM } from '@src/models/dtm/AttendanceDTM'

class AttendanceService implements IAttendanceService {
  getList = async (data: { classId?: string; expiredAt?: Date }) => {
    const res = await R.db.attendance.getList(data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  getUniqueList = async (data: { classId?: string }) => {
    let items: string[] = []
    const res = await R.db.attendance.getList(data)
    if (res.error) return { error: res.error }
    const uniqueList = res.value.filter((item) => {
      if (!items.includes(item.expiredAt.toISOString())) {
        items.push(item.expiredAt.toISOString())
        return item
      }
    })
    return { value: uniqueList }
  }

  getByID = async (id: string) => {
    const res = await R.db.attendance.getByID(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  create = async (data: INewAttendance) => {
    let request: INewAttendanceDTM[] = []
    const expiredAt = new Date(Date.now() + 15 * 60 * 1000)
    if (!data.students) {
      const clases = await R.db.clases.getByID(data.classId)
      if (!clases.value && clases.error) return { error: clases.error }

      const students = await R.db.students.getList(clases.value.group.id)
      if (!students.value && students.error) return { error: students.error }
      request = students.value.map((item) => ({
        classId: data.classId,
        studentId: item.id,
        expiredAt,
      }))
    } else {
      request = data.students.map((item) => ({
        classId: data.classId,
        studentId: item,
        expiredAt,
      }))
    }

    const res = await R.db.attendance.create(request)
    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  update = async (data: IUpdateAttendance) => {
    const res = await R.db.attendance.update(data.id, data)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
  updateByStudent = async (data: IUpdateByStudentAttendance) => {
    // const cUn = [
    //   [52.093860337774906, 23.755108832181666],
    //   [52.09884096626363, 23.762897967160907],
    // ] БрГТУ
    const cUn = [
      [52.07005469685884, 23.724151176135127],
      [52.07150265382332, 23.726393502871534],
    ] //Test
    const isAttented =
      data.coords.latitude >= cUn[0][0] &&
      data.coords.latitude <= cUn[1][0] &&
      data.coords.longitude >= cUn[0][1] &&
      data.coords.longitude <= cUn[1][1]
    // const isAttented = true
    const res = await R.db.attendance.updateByStudent({
      ...data,
      isAttented,
      coords: JSON.stringify(data.coords),
    })

    if (res.error) return { error: res.error }
    return { value: res.value }
  }

  delete = async (id: string) => {
    const res = await R.db.attendance.delete(id)

    if (res.error) return { error: res.error }
    return { value: res.value }
  }
}

export default new AttendanceService()
