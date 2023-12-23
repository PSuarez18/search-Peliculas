import { useEffect, useRef, useState, useCallback } from 'react'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useInputController'
import './App.css'
import debounce from 'just-debounce-it'
import { handleMovieClick } from './services/movieDetailApi'
import MovieDetail from './components/detail'
import { initializeCanvas } from './styles/backgroundScript'
import Loader from './components/loader'

function App() {

  const [sortMovies, setSortMovies] = useState(false)
  const { inputForm, setInputForm, error } = useSearch()
  const { movies, getMovies, loading, errorMessage } = useMovies({ inputForm, sortMovies })
  const [movieData, setMovieData] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false);

  const debouncedGetMovies = useCallback(debounce(inputForm => {  // el debounce sirve para que no se hagan llamadas en vano a la API, es decir que no se hagan llamadas a la API hasta que no se termine de escribir en el input, es decir que no se hagan llamadas en vano a la API, pero si cada 300 milisegundos
    getMovies({ inputForm })
  }, 300)
    , [getMovies]  // uso callback  con dependencias de getmovies para que solo se cree el debounce cuando estoy necesitando getmovies
  )  // y el usscallback hace que no se cree en cada rende render el debounce


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

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false)
  }


  const canvasRef = useRef(null);
  useEffect(() => {
    const canvasScript = initializeCanvas(canvasRef.current);

  }, []); // Se ejecutará solo una vez al montar el componente




  return (

    <div className='page'>
      <header>
        <form className='form-container' onSubmit={handleSubmit}>
          <label className="label-search" htmlFor="input-search">Busca tu Película:</label>
          <input value={inputForm}
            onChange={handleChangeInput}
            name='inputSearchForDoom'
            type="text"
            id='input-search'
            placeholder='Encuentrala...'
            className='input-search'
          />
          <label className='sort-label' htmlFor='input-checkbox' >Ver por Orden Alfabetico A-Z</label>
          <input className='sort-checkbox' type="checkbox" onChange={handleSort} checked={sortMovies} id='input-checkbox' />


        </form>
        {error && <p className="error-message">{error}</p>}

      </header>

      <main>
        {
          loading ?
            (<Loader />)
            :
            (
              <>
                {isModalOpen && movieData ?
                  (<MovieDetail data={movieData} onClose={closeModal} />)
                  : (
                    inputForm && movies ? <Movies movies={movies} onMovieClick={(title) => handleMovieClick(title, setMovieData, openModal)} />
                      : <></>)}
              </>
            )
        }

      </main>
      <canvas id="nokey" ref={canvasRef}></canvas>
    </div>

  )
}

export default App
