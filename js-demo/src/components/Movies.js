import React from 'react';

import MovieCard from './MovieCard';
import resource from './resource';

const Movies = () => {
  const data = resource.read('/top-rated-movies');

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
      {data.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;
