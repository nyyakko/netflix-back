import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.bulkInsert('genres', [
        { name: 'Action' },
        { name: 'Adventure' },
        { name: 'Comedy' },
        { name: 'Fantasy' },
        { name: 'Mystery' },
        { name: 'Romance' },
    ]);
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.bulkDelete('genres');
}
