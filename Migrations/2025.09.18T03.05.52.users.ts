import { DataTypes } from '@sequelize/core';
import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';
import bcrypt from 'bcryptjs';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.getQueryInterface().createTable('users', {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    await sequelize.getQueryInterface().bulkInsert('users', [
        {
            name: process.env.ADMIN_USERNAME!,
            email: process.env.ADMIN_EMAIL!,
            password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10)
        }
    ]);
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.getQueryInterface().dropTable('users');
}
