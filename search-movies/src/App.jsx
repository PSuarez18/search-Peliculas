import { useEffect, useRef, useState } from 'react'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useInputController'
import './App.css'

function App() {

  const [sortMovies, setSortMovies] = useState(false)
  const { inputForm, setInputForm, error } = useSearch()
  const { movies, getMovies, loading, errorMessage } = useMovies({ inputForm, sortMovies })


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
    getMovies()
  }
  const handleChangeInput = (event) => {
    const newInputForm = event.target.value
    if (newInputForm.startsWith(' ')) return;
    setInputForm(event.target.value)
  }
  const handleSort = () => {
    setSortMovies(!sortMovies)
  }

  return (
    <div className='page'>
      <header>
        <form className='form-container' onSubmit={handleSubmit}>
          <label htmlFor="input-search">Buscar Peliculas</label>
          <input value={inputForm}
            onChange={handleChangeInput}
            name='inputSearchForDoom'
            type="text"
            id='input-search'
            placeholder='Batman Returns, Harry Potter, Mision Imposible' />
          <input type="checkbox" onChange={handleSort} checked={sortMovies} />
          <button type="submit">Buscar</button>

        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}

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
