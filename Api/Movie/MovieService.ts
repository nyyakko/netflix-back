import Movie from '../../Persistence/Entities/Movie.js';
import MovieRequest from './Contracts/Requests/MovieRequest.js';
import MovieResponse from './Contracts/Responses/MovieResponse.js';

import MovieAlreadyExistsException from './Exceptions/MovieAlreadyExistsException.js';
import MovieNotFoundException from './Exceptions/MovieNotFoundException.js';

export async function save({ title, synopsis, rating, popularity, genres, releaseDate, original, posterPath, backdropPath }: MovieRequest): Promise<MovieResponse>
{
    if (await Movie.findOne({ where: { title }})) {
        throw new MovieAlreadyExistsException();
    }

    const movie = await Movie.create({ title, synopsis, rating, popularity, releaseDate, original, posterPath, backdropPath });
    movie.setGenres(genres);

    return MovieResponse.fromEntity(movie!);
}

export async function removeById(id: number)
{
    await Movie.destroy({ where: { id } });
}

export async function get(page: number, limit: number): Promise<MovieResponse[]>
{
    const { rows } = await Movie.findAndCountAll({
        limit: limit,
        offset: (page-1) * limit,
        order: [['createdAt', 'DESC']]
    });

    return await Promise.all(rows.map(MovieResponse.fromEntity));
}

export async function getById(id: number): Promise<MovieResponse>
{
    const movie = await Movie.findByPk(id);

    if (!movie) {
        throw new MovieNotFoundException();
    }

    return MovieResponse.fromEntity(movie!);
}
