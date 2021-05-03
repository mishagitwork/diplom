import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
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

  @OneToOne(() => User, (user) => user.university, { cascade: true }) // specify inverse side as a second parameter
  @JoinColumn()
  user: User
}
