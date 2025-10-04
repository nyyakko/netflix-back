import Movie from '../../../../Persistence/Entities/Movie.js';
import GenreResponse from '../../../Genre/Contracts/Responses/GenreResponse.js';

export default class MovieResponse
{
    id!: number;
    title!: string;
    synopsis!: string;
    rating!: number;
    genres!: GenreResponse[];

    static async fromEntity(movie: Movie): Promise<MovieResponse>
    {
        let response = new MovieResponse();

        response.id = movie.get('id');
        response.title = movie.get('title');
        response.synopsis = movie.get('synopsis');
        response.rating = movie.get('rating');

        const genres = await movie.getGenres();
        response.genres = genres.map(GenreResponse.fromEntity);

        return response;
    }
}
