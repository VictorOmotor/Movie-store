import React from 'react';
import './MovieThumb.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

const MovieThumb = ({movieId, movieName, image, clickable}) => {
  return (
    <div className="rmdb-moviethumb">
    {clickable ? (
      <Link to={`/${movieId}`} state={{ movieName: movieName }}>
        <img src={image} alt="moviethumb" />
      </Link>
      ): (
      <img src={image} alt="moviethumb" />
    )}
    </div>
  )
}

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
}

export default MovieThumb