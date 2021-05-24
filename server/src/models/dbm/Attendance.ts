import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Class } from './Class'
import { Student } from './Student'

@Entity({ name: 'attendance' })
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  createdAt: Date

  @Column()
  editedAt: Date

  @Column()
  expiredAt: Date

  @Column()
  isAttended: boolean

  @Column()
  coords: string

  @Column()
  classId: string

  @Column()
  studentId: string

  @ManyToOne(() => Class, (classs) => classs.attendance)
  class: Class

  @ManyToOne(() => Student, (student) => student.attendance)
  student: Student
}
