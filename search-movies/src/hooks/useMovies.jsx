import { searchMovies } from "../services/moviesApi";
import { useRef, useState, useMemo } from "react";

export const useMovies = ({ inputForm, sortMovies }) => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(inputForm) // useRef es para que el valor persista entre renders // con Esto evito la misma busqueda es decir no uso llamadas en vano a la API


    //Este useMemo que acabo de usar en este contexto es util porque cuando esta cambiando el input de busqueda se esta generando diferentes funciones y solo quiero que se genere cuando ya existe el inputForm final como tal
    //En cuestiones de performance es mejor usar useMemo que usar useCallback porque este ultimo es para funciones y el useMemo es para cualquier tipo de valor 
    const getMovies = useMemo(() => {
        return async ({ inputForm }) => {  // cuando se lo inyecto por parametro dependo unicamente cuando se genera con el submit
            if (inputForm === previousSearch.current) return
            try {
                setLoading(true)
                setError(null)
                previousSearch.current = inputForm
                const newMovies = await searchMovies({ inputForm })
                setMovies(newMovies)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
    }, [inputForm])
    //use MEMO es para que no se vuelva a ejecutar la funcion si no cambia el valor de la dependencia, es decir se almacena en memoria el ultimo calculo de las mismas funciones, no guarda los demas
    const sortedMovies = useMemo(() => {
        return sortMovies && movies?.length > 0
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies ?? []; // operador de fusion nula ?? porque movies no tiene longitud entonces no tendria que crearse un error si esta activado el ordenamiento y no tengo nada en inputform busqueda por lo tanto no habria nada en movies
    }, [movies, sortMovies])

    return { movies: sortedMovies, getMovies, loading, errorMessage: error }
}