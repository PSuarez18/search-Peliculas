import { useState } from 'react'
import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'

function App() {


  const { movies : mappedMovies } = useMovies()

  const [searchInput, setSearchInput] = useState('')

  return (
    <div className='page'>
      <header>
        <form className='form-container'>
          <label htmlFor="input-search">Buscar Peliculas</label>
          <input type="text" id='input-search' placeholder='Batman Returns, Harry Potter, Mision Imposible' />
          <button type="submit">Buscar</button>

        </form>

      </header>

      <main>
        <Movies movies={mappedMovies} />

      </main>
    </div>
  )
}

export default App
