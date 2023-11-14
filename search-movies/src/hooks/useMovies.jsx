import { searchMovies } from "../services/moviesApi";
import { useRef, useState, useMemo } from "react";

export const useMovies = ({ inputForm, sortMovies }) => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(inputForm) // useRef es para que el valor persista entre renders // con Esto evito la misma busqueda es decir no uso llamadas en vano a la API

    const getMovies = async () => {
        if (inputForm === previousSearch.current) return
        try {
            setLoading(true)
            setError(null)
            previousSearch.current = inputForm
            const newMovies = await searchMovies({ inputForm })
            setMovies(newMovies)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    const sortedMovies = useMemo(()=> {
        return sortMovies
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies}, [movies, sortMovies])

    return { movies: sortedMovies, getMovies, loading, errorMessage: error }
}