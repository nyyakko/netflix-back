import { DataTypes } from '@sequelize/core';
import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.changeColumn('movies', 'rating', {
        type: DataTypes.DOUBLE,
        allowNull: false
    });
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.changeColumn('movies', 'rating', {
        type: DataTypes.DOUBLE,
        allowNull: true
    });
}
