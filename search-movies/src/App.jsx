import { useEffect, useRef, useState, useCallback } from 'react'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useInputController'
import './App.css'
import debounce from 'just-debounce-it'

function App() {

  const [sortMovies, setSortMovies] = useState(false)
  const { inputForm, setInputForm, error } = useSearch()
  const { movies, getMovies, loading, errorMessage } = useMovies({ inputForm, sortMovies })

  const debouncedGetMovies = useCallback(debounce(inputForm => {  // el debounce sirve para que no se hagan llamadas en vano a la API, es decir que no se hagan llamadas a la API hasta que no se termine de escribir en el input, es decir que no se hagan llamadas en vano a la API, pero si cada 300 milisegundos
    getMovies({ inputForm })
  }, 300)
    , [getMovies]  // uso callback con dependencias de getmovies para que solo se cree el debounce cuando estoy necesitando getmovies
  )

  /*const inputRef = useRef()    MANERA DE HACERLO CON EL USEREF , OSEA MANIPULANDO DIRECTAMENTE EL ARBOL ES UNA MANERA NO CONTROLADADA DE HACERLO, es para que el valor persista entre renders 

  const handleSubmit= (event) => {   NO OLVIDAR AGREGAR EL ATRIBUTO REF EN EL INPUT PARA USAR ESTA FORMA
    event.preventDefault()
    const inputEl= inputRef.current
    const value = inputEl.value
    console.log(value)
  }*/

  /*const handleSubmit1 = (event) => {
    event.preventDefault()
    const {inputSearchForDoom} = Object.fromEntries(new window.FormData(event.target))
    console.log(inputSearchForDoom)
    //ESTA MANERA HACE QUE PUEDA RECUPERAR LOS VALODRES DEL ELEMENTOS DEL DOOM Y ES MAS ESCALABLE , ASI NO TENGO QUE CREAR UN REF PARA CADA INPUT, SERIA UN CODIGO MAS LIMPIO 
    tengo que descontracturar la entrada osea el input usando el atributo name del input en este caso inputSearchForDoom
  }*/
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ inputForm })
  }
  const handleChangeInput = (event) => {
    const newInputForm = event.target.value
    if (newInputForm.startsWith(' ')) return;
    setInputForm(capitalizeFirstLetter(newInputForm))
    debouncedGetMovies(newInputForm)
  }
  const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  const handleSort = () => {
    setSortMovies(!sortMovies)
  }

  return (
    <div className='page'>
      <header>
        <form className='form-container' onSubmit={handleSubmit}>
          <label className="label-search"  htmlFor="input-search">Busca tu Película:</label>
          <input value={inputForm}
            onChange={handleChangeInput}
            name='inputSearchForDoom'
            type="text"
            id='input-search'
            placeholder='Encuentrala...'
            className='input-search'
             />
          <label className='sort-label' htmlFor='input-checkbox' >Ver por Orden Alfabetico A-Z</label>
          <input className='sort-checkbox'  type="checkbox" onChange={handleSort} checked={sortMovies}  id='input-checkbox'/>
          

        </form>
        {error && <p className="error-message">{error}</p>}

      </header>

      <main>
        {
          loading ? <p>loading...</p> : null}
        <Movies movies={movies} />

      </main>
    </div>
  )
}

export default App
