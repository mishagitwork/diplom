import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Class } from './Class'
import { University } from './University'

@Entity({ name: 'subjects' })
export class Subject {
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

  @ManyToOne(() => University, (university) => university.subjects, {
    eager: true,
  })
  university: University

  @OneToMany(() => Class, (classs) => classs.subject, { cascade: true })
  classes: Class[]
}
