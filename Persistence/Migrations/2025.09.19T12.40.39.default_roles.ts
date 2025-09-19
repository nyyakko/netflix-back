import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.bulkInsert('roles', [
        { name: 'ADMIN' },
        { name: 'USER' },
    ]);
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.bulkDelete('roles', {
        where: [{ name: 'ADMIN' }, { name: 'USER' }]
    });
}
