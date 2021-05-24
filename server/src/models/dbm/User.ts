import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from 'typeorm'
import { Professor } from './Professor'
import { Student } from './Student'
import { University } from './University'
const bcrypt = require('bcrypt')

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  createdAt: Date

  @Column()
  editedAt: Date

  @Column()
  fullName: string

  @Column()
  birthday: Date

  @Column()
  avatar: string

  @Column({ unique: true })
  login: string

  @Column()
  password: string

  @Column()
  isAdmin: boolean

  @OneToOne(() => University, (university) => university.user) // specify inverse side as a second parameter
  university: University

  @OneToOne(() => Professor, (professor) => professor.user)
  professor: Professor

  @OneToOne(() => Student, (student) => student.user, { cascade: true })
  student: Student

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    try {
      this.password = bcrypt.hashSync(this.password, 10)
    } catch (e) {
      throw new Error('there are some issiue in the hash')
    }
  }
  verifyPassword(password: string) {
    return bcrypt.compareSync(password, this.password)
  }
}
