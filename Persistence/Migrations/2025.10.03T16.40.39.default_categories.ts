import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    /// FIXME: TBD
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    /// FIXME: TBD
}
