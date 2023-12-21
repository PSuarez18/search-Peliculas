const API_KEY = "380535d0"
const BASE_URL = "http://www.omdbapi.com/"

export const handleMovieClick = async (title, setMovieData , openModal) => {
    try {
      const apiUrl = `${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(title)}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      setMovieData(data);

      openModal();

      
    } catch (error) {
      console.error('Error al realizar la llamada a la API:', error);
    }
  };