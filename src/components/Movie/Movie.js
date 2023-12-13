import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '../../config';
import Navigation from '../elements/Navigation/Navigation';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar';
import Spinner from '../elements/Spinner/Spinner';
import './Movie.css';
import { useLocation } from 'react-router-dom';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import Actor from '../elements/Actor/Actor';

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { movieName } = location?.state;
  
  useEffect(() => {
    const movieId = location.pathname.replace('/', '');

    if (!movieId) return;

    setLoading(true);

    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        if (result.status_code) {
          setLoading(false);
        } else {
          setMovie(result);

          const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
          fetch(creditsEndpoint)
            .then(result => result.json())
            .then(result => {
              const directors = result.crew.filter(member => member.job === 'Director');
              setActors(result.cast);
              setDirectors(directors);
              setLoading(false);
              localStorage.setItem(`${movieId}`, JSON.stringify({ movie: result, actors: result.cast, directors }));
            });
        }
      });
  }, [location.pathname]);

  return (
    <div className='rmdb-movie'>
      {movie ? (
        <div>
          <Navigation movie={movieName} />
          <MovieInfo movie={movie} directors={directors} />
          <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
        </div>
      ) : null}
      {actors ? (
        <div className='rmdb-movie-grid'>
          <FourColGrid header='Actors'>   
          {actors.map((element, i) => (
          <Actor key={i} actor={element}/>
          ))}
          </FourColGrid>
        </div>
      ) : null}
      {!actors && !loading && <h1>No Movie Found!</h1>}
      {loading && <Spinner />}
    </div>
  );
}

  export default Movie;
