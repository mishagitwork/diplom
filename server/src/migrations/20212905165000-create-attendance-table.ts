import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateAttendanceTable20212905165000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendance',
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
            name: 'expiredAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'isAttended',
            type: 'boolean',
            default: false,
          },
          {
            name: 'classId',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'studentId',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true
    )
    await queryRunner.createForeignKey(
      'attendance',
      new TableForeignKey({
        columnNames: ['classId'],
        referencedTableName: 'classes',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    )
    await queryRunner.createForeignKey(
      'attendance',
      new TableForeignKey({
        columnNames: ['studentId'],
        referencedTableName: 'students',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attendance')
  }
}
