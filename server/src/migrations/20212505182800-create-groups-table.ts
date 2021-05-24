import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateGroupsTable20212505182800 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'groups',
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
            name: 'fullName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'shortName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'graduationDate',
            type: 'timestamptz',
            isNullable: false,
          },
          {
            name: 'facultyId',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true
    )
    await queryRunner.createForeignKey(
      'groups',
      new TableForeignKey({
        columnNames: ['facultyId'],
        referencedTableName: 'faculty',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('groups')
  }
}
