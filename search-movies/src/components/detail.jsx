import React, { useRef, useEffect, useState } from 'react';
import "../styles/detailMovie.css";

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
};

function MovieDetail({ data, onClose }) {
    const modalRef = useRef(null);
    const [activeElement, setActiveElement] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleParagraphClick = (event) => {
        const clickedElement = event.target;
        setActiveElement((prevElement) => {
            if (prevElement && prevElement !== clickedElement) {
                return null;
            }

            if (prevElement === clickedElement) {
                return null;
            }

            return clickedElement;
        });
    };


    return (
        <div className="modal-overlay">
            <div className="modal-container" ref={modalRef}>
                <span className="modal-close" onClick={onClose}>&times;</span>
                <h1 className="modal-title">{data.Title}</h1>
                <img src={data.Poster} alt={data.Title} />

                <div className='container-border'>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Year}:</strong> {data.Year}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Rated}:</strong> {data.Rated}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Released}:</strong> {data.Released}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Runtime}:</strong> {data.Runtime}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Genre}:</strong> {data.Genre}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Director}:</strong> {data.Director}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Writer}:</strong> {data.Writer}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Actors}:</strong> {data.Actors}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Plot}:</strong> {data.Plot}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Language}:</strong> {data.Language}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Country}:</strong> {data.Country}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Awards}:</strong> {data.Awards}</p>
                </div>

                <div  className='container-border' >
                    <h2>{translations.Ratings}</h2>
                    {data.Ratings.map((rating, index) => (
                        <p key={index} onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{rating.Source}:</strong> {rating.Value}</p>
                    ))}
                    <hr></hr>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Metascore}:</strong> {data.Metascore}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.imdbRating}:</strong> {data.imdbRating}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.imdbVotes}:</strong> {data.imdbVotes}</p>
                </div>

                <div  className='container-border' > 
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Type}:</strong> {data.Type}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.DVD}:</strong> {data.DVD}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.BoxOffice}:</strong> {data.BoxOffice}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Production}:</strong> {data.Production}</p>
                    <p onClick={handleParagraphClick} className={activeElement === null ? 'active' : ''}><strong>{translations.Website}:</strong> {data.Website}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
