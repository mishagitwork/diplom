import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateFacultyTable20212205205200 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'faculty',
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
            name: 'universityId',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true
    )
    await queryRunner.createForeignKey(
      'faculty',
      new TableForeignKey({
        columnNames: ['universityId'],
        referencedTableName: 'university',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('faculty')
  }
}
