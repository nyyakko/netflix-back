import { DataTypes } from '@sequelize/core';
import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.getQueryInterface().createTable('roles', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    await sequelize.getQueryInterface().bulkInsert('roles', [
        { name: 'ADMIN' },
        { name: 'USER' },
    ]);
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.getQueryInterface().dropTable('roles');
}
