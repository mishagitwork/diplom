import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm'
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

  @BeforeInsert()
  updateDates() {
    this.birthday = new Date()
  }

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    try {
      console.log('SSSSSSSSSSSS')
      this.password = bcrypt.hashSync(this.password, 10)
    } catch (e) {
      throw new Error('there are some issiue in the hash')
    }
  }
  verifyPassword(password: string) {
    return bcrypt.compareSync(password, this.password)
  }
}
