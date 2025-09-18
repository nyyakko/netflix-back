import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

import User from '../Entities/User.js';
import Movie from '../Entities/Movie.js';
import Role from '../Entities/Role.js';

export function the()
{
    return new Sequelize({
        dialect: PostgresDialect,
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT!),
        clientMinMessages: 'notice',
        models: [Role, User, Movie]
    });
}
