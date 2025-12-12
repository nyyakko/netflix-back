import Movie from '../../../../Persistence/Entities/Movie.js';
import GenreResponse from '../../../Genre/Contracts/Responses/GenreResponse.js';

export default class MovieResponse
{
    id!: number;
    title!: string;
    releaseDate!: Date;
    synopsis!: string;
    rating!: number;
    popularity!: number;
    genres!: GenreResponse[];
    original!: boolean;
    posterPath!: string;
    backdropPath!: string;

    static async fromEntity(movie: Movie): Promise<MovieResponse>
    {
        let response = new MovieResponse();

        response.id = movie.get('id');
        response.title = movie.get('title');
        response.releaseDate = movie.get('releaseDate');
        response.rating = movie.get('rating');
        response.popularity = movie.get('popularity');
        response.synopsis = movie.get('synopsis');

        const genres = await movie.getGenres();
        response.genres = genres.map(GenreResponse.fromEntity);

        response.original = movie.get('original');
        response.posterPath = movie.get('posterPath');
        response.backdropPath = movie.get('backdropPath');

        return response;
    }
}
