import type { MigrationParams } from 'umzug';
import type { PostgresDialect } from '@sequelize/postgres';
import { type Sequelize  } from '@sequelize/core';

import fetch from 'node-fetch';

const MOVIEDB_BASE_URL = 'https://api.themoviedb.org';

export async function up({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    const originalsResponse = await fetch(`${MOVIEDB_BASE_URL}/3/discover/tv?api_key=${process.env.MOVIEDB_API_KEY}&language=pt-br&with_networks=213`);
    const originals = await originalsResponse.json() as any;

    await sequelize.queryInterface.bulkInsert('movies', originals.results.map((entry: any) => {
        return {
            title: entry.name,
            synopsis: entry.overview,
            rating: entry.vote_average,
            releaseDate: new Date(entry.first_air_date),
            posterPath: `https://image.tmdb.org/t/p/w500${entry.poster_path}`,
            backdropPath: `https://image.tmdb.org/t/p/w1280${entry.backdrop_path}`,
            popularity: entry.popularity,
            original: true
        }
    }));

    const nonOriginalsResponse = await Promise.all([
        fetch(`${MOVIEDB_BASE_URL}/3/discover/tv?api_key=${process.env.MOVIEDB_API_KEY}&language=pt-br&page=1`),
        fetch(`${MOVIEDB_BASE_URL}/3/discover/tv?api_key=${process.env.MOVIEDB_API_KEY}&language=pt-br&page=2`),
        fetch(`${MOVIEDB_BASE_URL}/3/discover/tv?api_key=${process.env.MOVIEDB_API_KEY}&language=pt-br&page=3`),
    ])

    const nonOriginals = await Promise.all(nonOriginalsResponse.map(response => response.json())) as any[];

    await sequelize.queryInterface.bulkInsert('movies',
        nonOriginals
            .map((entry: any) => entry.results).flat()
            .filter((entry: any) => !originals.results.find((original: any) => original.name == entry.name))
            .map((entry: any) => {
                return {
                    title: entry.name,
                    synopsis: entry.overview,
                    rating: entry.vote_average,
                    releaseDate: new Date(entry.first_air_date),
                    posterPath: `https://image.tmdb.org/t/p/w500${entry.poster_path}`,
                    backdropPath: `https://image.tmdb.org/t/p/w1280${entry.backdrop_path}`,
                    popularity: entry.popularity,
                    original: false
                };
            })
    );
}

export async function down({ context: sequelize }: MigrationParams<Sequelize<PostgresDialect>>)
{
    await Promise.all([
        sequelize.queryInterface.bulkDelete('movie_genres'),
        sequelize.queryInterface.bulkDelete('movies')
    ]);
}
