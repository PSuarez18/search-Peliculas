import whitResults from "../mocks/whit-results.json"
import whitoutResults from "../mocks/no-results.json"
import { useState } from "react";

export const useMovies = ({ inputForm }) => {

    const [respMovies, setRespMovies] = useState([])

    const movies = whitResults.Search;


    const mappedMovies = movies?.map(
        movie => (
            {
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster,
            })
    )
    
    const getMovies = () => {
        if (inputForm) {
            setRespMovies(whitResults)
        } else {
            setRespMovies(whitoutResults)
        }
    }
    return { movies: mappedMovies }
}