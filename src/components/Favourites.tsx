import React from 'react';

interface Favourite {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Genre: string;
  Poster: string;
  imdbID: string;
  Type: string;
  Website: string;
}

interface Props {
  favourites: Favourite[];
  handleUnfavourite: (movie: Favourite) => void;
}

const Favourites: React.FC<Props> = ({ favourites, handleUnfavourite }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    if (!img.naturalWidth && !img.naturalHeight) {
      img.src = 'placeholder.jpg';
    }
  }

  return (
    <div>
      <h3>Favourites</h3>
      <div className="movies-box">
        <ul className="favourites-list">
          {favourites.map(movie => (
            <li key={movie.imdbID} className="movie-container">
              <img src={movie.Poster} alt={movie.Title} className="poster" onError={handleImageError}/>
              <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noreferrer">
                <div className="movie-overlay">
                  <div className="movie-title">{movie.Title}</div>
                </div>
              </a>
              <button onClick={() => handleUnfavourite(movie)} className="favourite-button">Unfavourite</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favourites;