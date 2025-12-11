import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import { QueryTypes, type Sequelize  } from '@sequelize/core';

import type Movie from '../Entities/Movie.js';
import type Genre from '../Entities/Genre.js';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await sequelize.queryInterface.bulkInsert('movies', [
        {
            title: 'Filme A',
            synopsis: 'Sinopse do Filme A',
            rating: 10.0,
            releaseDate: new Date('12/05/2023')
        },
        {
            title: 'Filme B',
            synopsis: 'Sinopse do Filme B',
            rating: 10.0,
            releaseDate: new Date('05/03/2020')
        }
    ]);

    const movies = [
        await sequelize.query('SELECT id FROM movies WHERE title = :title', { replacements: { title: 'Filme A' }, type: QueryTypes.SELECT }) as Movie[],
        await sequelize.query('SELECT id FROM movies WHERE title = :title', { replacements: { title: 'Filme B' }, type: QueryTypes.SELECT }) as Movie[]
    ];

    {
        const genres = await sequelize.query('SELECT id FROM genres WHERE name = :name', { replacements: { name: 'Comedy' }, type: QueryTypes.SELECT }) as Genre[];
        await sequelize.queryInterface.bulkInsert('movie_genres', genres.map(genre => { return { movieId: movies.flat()[0]!.id, genreId: genre.id } }));
    }
    {
        let genres = await Promise.all(['Adventure', 'Fantasy', 'Comedy'].map(async genre => {
            return sequelize.query('SELECT id FROM genres WHERE name = :name', { replacements: { name: genre }, type: QueryTypes.SELECT }) as Promise<Genre[]>
        }));

        // const genres = ;
        // await sequelize.queryInterface.bulkInsert('movie_genres', genres.map(genre => { return { movieId: movies.flat()[1]!.id, genreId: genre.id } }));
    }
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await Promise.all([
        sequelize.queryInterface.bulkDelete('movie_genres'),
        sequelize.queryInterface.bulkDelete('movies')
    ]);
}
