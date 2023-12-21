import React, { useRef, useEffect } from 'react';
import "../styles/detailMovie.css"

const translations = {
    Title: 'Título',
    Year: 'Año',
    Rated: 'Clasificación',
    Released: 'Fecha de lanzamiento',
    Runtime: 'Duración',
    Genre: 'Género',
    Director: 'Director',
    Writer: 'Escritor',
    Actors: 'Actores',
    Plot: 'Trama',
    Language: 'Idioma',
    Country: 'País',
    Awards: 'Premios',
    Poster: 'Póster',
    Ratings: 'Calificaciones',
    Metascore: 'Metascore',
    imdbRating: 'IMDb Rating',
    imdbVotes: 'IMDb Votos',
    imdbID: 'IMDb ID',
    Type: 'Tipo',
    DVD: 'DVD',
    BoxOffice: 'Taquilla',
    Production: 'Producción',
    Website: 'Sitio web',
    Response: 'Respuesta',
};

function MovieDetail({ data, onClose }) {

    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);


    return (
        <div className="modal-overlay">
            <div className="modal-container" ref={modalRef}>
                <span className="modal-close" onClick={onClose}>&times;</span>
                <h1 className="modal-title">{data.Title}</h1>
                <img src={data.Poster} alt={data.Title} />

                <div>
                    <p><strong>{translations.Year}:</strong> {data.Year}</p>
                    <p><strong>{translations.Rated}:</strong> {data.Rated}</p>
                    <p><strong>{translations.Released}:</strong> {data.Released}</p>
                    <p><strong>{translations.Runtime}:</strong> {data.Runtime}</p>
                    <p><strong>{translations.Genre}:</strong> {data.Genre}</p>
                    <p><strong>{translations.Director}:</strong> {data.Director}</p>
                    <p><strong>{translations.Writer}:</strong> {data.Writer}</p>
                    <p><strong>{translations.Actors}:</strong> {data.Actors}</p>
                    <p><strong>{translations.Plot}:</strong> {data.Plot}</p>
                    <p><strong>{translations.Language}:</strong> {data.Language}</p>
                    <p><strong>{translations.Country}:</strong> {data.Country}</p>
                    <p><strong>{translations.Awards}:</strong> {data.Awards}</p>
                </div>

                <div>
                    <h2>{translations.Ratings}</h2>
                    {data.Ratings.map((rating, index) => (
                        <p key={index}><strong>{rating.Source}:</strong> {rating.Value}</p>
                    ))}
                    <hr></hr>
                    <p><strong>{translations.Metascore}:</strong> {data.Metascore}</p>
                    <p><strong>{translations.imdbRating}:</strong> {data.imdbRating}</p>
                    <p><strong>{translations.imdbVotes}:</strong> {data.imdbVotes}</p>
                </div>

                <div>
                    <p><strong>{translations.Type}:</strong> {data.Type}</p>
                    <p><strong>{translations.DVD}:</strong> {data.DVD}</p>
                    <p><strong>{translations.BoxOffice}:</strong> {data.BoxOffice}</p>
                    <p><strong>{translations.Production}:</strong> {data.Production}</p>
                    <p><strong>{translations.Website}:</strong> {data.Website}</p>
                    <p><strong>{translations.Response}:</strong> {data.Response}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;