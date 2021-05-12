import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { Faculty } from './Faculty'

import { User } from './User'

@Entity({ name: 'professors' })
export class Professor {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  createdAt: Date

  @Column()
  editedAt: Date

  @Column()
  position: string

  @Column()
  userId: string

  @Column()
  facultyId: string

  @OneToOne(() => User, (user) => user.professor, { cascade: true })
  @JoinColumn()
  user: User

  @ManyToOne(() => Faculty, (faculty) => faculty.professors, {
    eager: true,
  })
  faculty: Faculty
}
