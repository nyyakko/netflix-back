import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import type Sequelize from '@sequelize/core';

import fetch from 'node-fetch';

const MOVIEDB_BASE_URL = 'https://api.themoviedb.org';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    const genresResponse = await fetch(`${MOVIEDB_BASE_URL}/3/genre/tv/list?api_key=${process.env.MOVIEDB_API_KEY}&language=pt-br`);
    const genres = await genresResponse.json() as any;

    await sequelize.queryInterface.bulkInsert('genres', genres.genres.map((entry: any) => {
        return {
            id: entry.id,
            name: entry.name
        };
    }));
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.bulkDelete('genres');
}
