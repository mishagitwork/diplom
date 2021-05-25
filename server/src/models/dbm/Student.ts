import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'

import { Group } from './Group'
import { User } from './User'
import { Attendance } from './Attendance'

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  createdAt: Date

  @Column()
  editedAt: Date

  @Column()
  studentCardId: string

  @Column()
  isMonitor: boolean

  @Column()
  userId: string

  @Column()
  groupId: string

  @OneToOne(() => User, (user) => user.student, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  user: User

  @ManyToOne(() => Group, (group) => group.students, {
    eager: true,
  })
  group: Group

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendance: Attendance[]
}
