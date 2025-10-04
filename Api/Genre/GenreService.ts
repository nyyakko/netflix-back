import Genre from '../../Persistence/Entities/Genre.js';
import GenreRequest from './Contracts/Requests/GenreRequest.js';
import GenreResponse from './Contracts/Responses/GenreResponse.js';

import GenreAlreadyExistsException from './Exceptions/GenreAlreadyExistsException.js';
import GenreNotFoundException from './Exceptions/GenreNotFoundException.js';

export async function save({ name, description }: GenreRequest): Promise<GenreResponse>
{
    if (await Genre.findOne({ where: { name }})) {
        throw new GenreAlreadyExistsException();
    }

    const genre = await Genre.create({ name, description });

    return GenreResponse.fromGenre(genre!);
}

export async function removeById(id: number)
{
    await Genre.destroy({ where: { id } });
}

export async function get(page: number, limit: number): Promise<GenreResponse[]>
{
    const { rows } = await Genre.findAndCountAll({
        limit: limit,
        offset: (page-1) * limit,
        order: [['createdAt', 'DESC']]
    });

    return rows.map(GenreResponse.fromGenre);
}

export async function getById(id: number): Promise<GenreResponse>
{
    const genre = await Genre.findByPk(id);

    if (!genre) {
        throw new GenreNotFoundException();
    }

    return GenreResponse.fromGenre(genre!);
}
