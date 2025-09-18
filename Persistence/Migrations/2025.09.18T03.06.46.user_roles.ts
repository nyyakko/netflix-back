import { DataTypes, literal, QueryTypes } from '@sequelize/core';
import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

import type User from '../Entities/User.js';
import type Role from '../Entities/Role.js';

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

    const user = await sequelize.query('SELECT id FROM users WHERE name = :name', { replacements: { name: process.env.ADMIN_USERNAME! }, type: QueryTypes.SELECT }) as User[];
    const roles = await sequelize.query('SELECT id FROM roles', { type: QueryTypes.SELECT }) as Role[];

    await sequelize.queryInterface.bulkInsert('user_roles', roles.map(role => { return { userId: user[0]!.id, roleId: role.id } }));
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.dropTable('user_roles');
}
