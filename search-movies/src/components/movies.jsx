const ListOfMovies = ({ movies, onMovieClick }) => {
    return (
        <ul className="movies">
            {movies.map(movie => (
                <li className="movie" key={movie.id} onClick={()=> {onMovieClick(movie.title)}}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title} />
                </li>
            ))}
        </ul>
    )
}

const NoMoviesResults = () => {
    return (
        <p>NO HAY PELICULAS QUE MOSTRAR, INTENTA CON OTRA BUSQUEDA</p>
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