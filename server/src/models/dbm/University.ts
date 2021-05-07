import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Faculty } from './Faculty'
import { User } from './User'

@Entity({ name: 'university' })
export class University {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  createdAt: Date

  @Column()
  editedAt: Date

  @Column()
  fullName: string

  @Column()
  shortName: string

  @Column()
  userId: string

  @OneToOne(() => User, (user) => user.university, { cascade: true })
  @JoinColumn()
  user: User

  @OneToMany(() => Faculty, (faculty) => faculty.university, { cascade: true })
  faculties: Faculty[]
}
