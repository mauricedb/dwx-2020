import React from 'react';

const MovieCard = ({ movie }) => (
  <div className="col mt-3">
    <div className="card h-100">
      <img
        src={`//image.tmdb.org/t/p/w300${movie.backdrop_path}`}
        className="card-img-top"
        alt={movie.title}
        height={190}
      />
      <div className="card-body">
        <h5 className="card-title text-truncate" title={movie.title}>
          {movie.title}
        </h5>
        <p className="card-text">{movie.overview}</p>
      </div>
    </div>
  </div>
);

export default MovieCard;
