import React from 'react';
import UserUserDetails from './UserUserDetails';
import UserMovieDetails from './UserMovieDetails';
import Loading from './Loading';

const UserDetails = () => (
  <>
    <React.Suspense fallback={<Loading />}>
      <UserUserDetails />
    </React.Suspense>
    <React.Suspense fallback={<Loading />}>
      <UserMovieDetails />
    </React.Suspense>
  </>
);

export default UserDetails;
