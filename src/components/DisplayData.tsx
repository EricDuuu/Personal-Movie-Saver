import React from 'react';
import axios from 'axios';

interface Movie {
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
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
  favourites: Movie[];
  handleFavourite: (movie: Movie) => void;
}

const DisplayData: React.FC<Props> = (props) => {
  const { search, setSearch, movies, setMovies, favourites, handleFavourite } = props;

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await axios.get<{ Search: Movie[] }>(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`);
    if(!res.data.Search || res.data.Search.length === 0){
      console.log("Movie Doesn't exist");
    } else {
      setMovies(res.data.Search);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    if (!img.naturalWidth && !img.naturalHeight) {
      img.src = 'placeholder.jpg';
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="movies-box">
        <ul className="movies-list">
          {movies.map(movie => (
            <li key={movie.imdbID} className="movie-container">
              <img src={movie.Poster} alt={movie.Title} className="poster" onError={handleImageError}/>
              <div>
                <a className="movie-overlay" href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noreferrer">
                  <div className="movie-title">{movie.Title}</div>
                </a>
                <button onClick={() => handleFavourite(movie)} className="favourite-button">
                  {favourites.some(m => m.imdbID === movie.imdbID) ? 'Unfavourite' : 'Favourite'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
  
  export default DisplayData;
  