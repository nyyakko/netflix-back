import Genre from '../../../../Persistence/Entities/Genre.js';

export default class GenreResponse
{
    id!: number;
    name!: string;
    description!: string;

    static fromGenre(genre: Genre): GenreResponse
    {
        let response = new GenreResponse();

        response.id = genre.get('id');
        response.name = genre.get('name');
        response.description = genre.get('description');

        return response;
    }
}
