import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateClassTable202129051640000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classes',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'editedAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'groupId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'professorId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'subjectId',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true
    )
    await queryRunner.createForeignKey(
      'classes',
      new TableForeignKey({
        columnNames: ['groupId'],
        referencedTableName: 'groups',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    )
    await queryRunner.createForeignKey(
      'classes',
      new TableForeignKey({
        columnNames: ['professorId'],
        referencedTableName: 'professors',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    )
    await queryRunner.createForeignKey(
      'classes',
      new TableForeignKey({
        columnNames: ['subjectId'],
        referencedTableName: 'subjects',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('classes')
  }
}
