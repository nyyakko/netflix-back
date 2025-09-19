import { DataTypes, literal } from '@sequelize/core';
import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.createTable('users', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP')
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.dropTable('users');
}
