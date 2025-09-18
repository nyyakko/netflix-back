import Movie from '../../../../Persistence/Entities/Movie.js';

export default class MovieResponse
{
    id!: number;
    title!: string;
    synopsis!: string;
    rating!: number;

    static fromMovie(movie: Movie): MovieResponse
    {
        let response = new MovieResponse();

        response.id = movie.get('id');
        response.title = movie.get('title');
        response.synopsis = movie.get('synopsis');
        response.rating = movie.get('rating');

        return response;
    }
}
