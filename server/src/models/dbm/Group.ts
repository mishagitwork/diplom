import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Faculty } from './Faculty'

@Entity({ name: 'groups' })
export class Group {
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
  graduationDate: Date

  @Column()
  facultyId: string

  @ManyToOne(() => Faculty, (faculty) => faculty.groups, {
    eager: true,
  })
  faculty: Faculty
}
