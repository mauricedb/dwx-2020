import React from 'react';

import resource from './resource';

const UserCard = ({ user }) => (
  <div className="col mt-3">
    <div className="card h-100">
      <img src={user.picture} className="card-img-top" alt={user.firstname} />
      <div className="card-body">
        <h5 className="card-title text-truncate">{`${user.firstname} ${user.surname}`}</h5>
        <p className="card-text">{user.email}</p>
        <p className="card-text">{user.phone}</p>
      </div>
      <div className="card-footer">
        <resource.Link
          to={`/user/${user.id}/movie/${user.favorite_movie}`}
          className="btn btn-primary"
          cacheKeys={[
            `/top-rated-movies/${user.favorite_movie}`,
            `/accounts/${user.id}`,
          ]}
        >
          Details
        </resource.Link>
      </div>
    </div>
  </div>
);

export default UserCard;
