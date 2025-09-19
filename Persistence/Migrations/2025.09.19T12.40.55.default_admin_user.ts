import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import { QueryTypes, type Sequelize } from '@sequelize/core';

import bcrypt from 'bcryptjs';

import type User from '../Entities/User.js';
import type Role from '../Entities/Role.js';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.bulkInsert('users', [
        {
            name: process.env.ADMIN_USERNAME!,
            email: process.env.ADMIN_EMAIL!,
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10)
        }
    ]);

    const user  = await sequelize.query('SELECT id FROM users WHERE name = :name', { replacements: { name: process.env.ADMIN_USERNAME! }, type: QueryTypes.SELECT }) as User[];
    const roles = await sequelize.query('SELECT id FROM roles', { type: QueryTypes.SELECT }) as Role[];

    await sequelize.queryInterface.bulkInsert('user_roles', roles.map(role => { return { userId: user[0]!.id, roleId: role.id } }));
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    const user = await sequelize.query('SELECT id FROM users WHERE name = :name', { replacements: { name: process.env.ADMIN_USERNAME! }, type: QueryTypes.SELECT }) as User[];

    await Promise.all([
        sequelize.queryInterface.bulkDelete('user_roles', { where: { userId: user[0]!.id }, }),
        sequelize.queryInterface.bulkDelete('users', { where: { email: process.env.ADMIN_EMAIL! }, })
    ]);
}
