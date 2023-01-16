import React, { useState, useEffect } from 'react';
import './App.css';
import DisplayData from './components/DisplayData';
import Favourites from './components/Favourites';
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

function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favourites, setFavourites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
    }
}, []);

  const handleFavourite = (movie: Movie) => {
    setFavourites(favs => {
          if (favs.some(m => m.imdbID === movie.imdbID)) {
              localStorage.setItem("favourites", JSON.stringify(favs.filter(m => m.imdbID !== movie.imdbID)));
              return favs.filter(m => m.imdbID !== movie.imdbID);
          } else {
              localStorage.setItem("favourites", JSON.stringify([...favs, movie]));
              return [...favs, movie];
          }
        });
    };

    const handleUnfavourite = (movie: Movie) => {
      setFavourites(favs => {
          localStorage.setItem("favourites", JSON.stringify(favs.filter(m => m.imdbID !== movie.imdbID)));
          return favs.filter(m => m.imdbID !== movie.imdbID);
      });
    };

  return (
    <div className="App-bg">
      <div className="App">
        <DisplayData
          search={search}
          setSearch={setSearch}
          movies={movies}
          setMovies={setMovies}
          favourites={favourites}
          handleFavourite={handleFavourite}
        />
        <Favourites favourites={favourites} handleUnfavourite={handleUnfavourite} />
      </div>
    </div>
  )

}

export default App;
