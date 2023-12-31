import "../styles/movies.css"
import imgNotFound from "../assets/vintage-movie.jpg"

const ListOfMovies = ({ movies, onMovieClick }) => {
    return (
        <ul className="movies">
            {movies.map(movie => (
                <li className="movie" key={movie.id} >
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img
                        src={movie.poster || imgNotFound}
                        alt={movie.title}
                        onClick={() => onMovieClick(movie.title)}
                        onError={(e) => {
                            e.target.src = imgNotFound;
                        }}
                    />

                </li>
            ))}
        </ul>
    )
}

const NoMoviesResults = () => {
    return (
        <div className="NoMoviesResults">
            <p>Lo sentimos, no encontramos ninguna película que coincida con tu búsqueda.</p>
        </div>
    )
}



export const Movies = ({ movies, onMovieClick }) => {

    const hasMovies = movies?.length > 0;
    return (
        hasMovies ?
            <ListOfMovies movies={movies} onMovieClick={onMovieClick} />
            :
            <NoMoviesResults />
    )
}