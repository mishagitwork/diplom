import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable20211505173800 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'birthday',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'login',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            default: 'false',
          },
        ],
      }),
      true
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
