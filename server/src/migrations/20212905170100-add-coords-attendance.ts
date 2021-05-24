import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddBotNoAnswerColumnChats20210309175400
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'attendance',
      new TableColumn({
        name: 'coords',
        type: 'varchar',
        isNullable: true,
      })
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('attendance', 'coords')
  }
}
