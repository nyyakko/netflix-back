import { DataTypes, literal } from '@sequelize/core';
import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.createTable('user_roles', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        userId: {
            type: DataTypes.INTEGER,
            references: { table: 'users', key: 'id'}
        },
        roleId: {
            type: DataTypes.INTEGER,
            references: { table: 'roles', key: 'id'}
        }
    });
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.dropTable('user_roles');
}
