import Movie from '../../Entities/Movie.js';
import MovieRequest from '../../Contracts/Movie/Requests/MovieRequest.js';
import MovieResponse from '../../Contracts/Movie/Responses/MovieResponse.js';

import MovieAlreadyExistsException from './Exceptions/MovieAlreadyExistsException.js';
import MovieNotFoundException from './Exceptions/MovieNotFoundException.js';

export async function save({ title, synopsis, rating, releaseDate }: MovieRequest): Promise<MovieResponse>
{
    if (await Movie.findOne({ where: { title }})) {
        throw new MovieAlreadyExistsException();
    }

    const movie = await Movie.create({ title, synopsis, rating, releaseDate });

    return MovieResponse.fromMovie(movie!);
}

export async function remove(id: number)
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

    return rows.map(MovieResponse.fromMovie);
}

export async function getById(id: number): Promise<MovieResponse>
{
    const movie = await Movie.findByPk(id);

    if (!movie) {
        throw new MovieNotFoundException();
    }

    return MovieResponse.fromMovie(movie!);
}
