import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import { Group } from './Group'
import { Professor } from './Professor'
import { Subject } from './Subject'

@Entity({ name: 'classes' })
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  createdAt: Date

  @Column()
  editedAt: Date

  @Column()
  professorId: string

  @Column()
  groupId: string

  @Column()
  subjectId: string

  @ManyToOne(() => Group, (group) => group.classes, {
    eager: true,
  })
  group: Group

  @ManyToOne(() => Professor, (professor) => professor.classes, {
    eager: true,
  })
  professor: Professor

  @ManyToOne(() => Subject, (subject) => subject.classes, {
    eager: true,
  })
  subject: Subject
}
