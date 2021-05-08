import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Group } from './Group'
import { University } from './University'

@Entity({ name: 'faculty' })
export class Faculty {
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
  universityId: string

  @ManyToOne(() => University, (university) => university.faculties, {
    eager: true,
  })
  university: University

  @OneToMany(() => Group, (group) => group.faculty, { cascade: true })
  groups: Group[]
}
