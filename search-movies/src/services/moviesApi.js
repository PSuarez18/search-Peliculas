const API_KEY = "380535d0"
const BASE_URL = "http://www.omdbapi.com/"

export const searchMovies = async ({ inputForm }) => {
  
    if (inputForm === "") return null
    try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${inputForm}`)
        const json = await response.json()
        const movies = json.Search 

        return  movies?.map(
            movie => (
                {
                    id: movie.imdbID,
                    title: movie.Title,
                    year: movie.Year,
                    poster: movie.Poster,
                })
        )
    } catch (error) {
        throw new Error("Error en la búsqueda de películas")
    }

}